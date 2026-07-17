import { useState } from 'react'

// Gere sua chave gratuita em https://web3forms.com (só precisa de um e-mail, sem cartão de crédito)
// e cole aqui. Enquanto isso não for feito, o envio cai automaticamente no modo local (localStorage).
const WEB3FORMS_ACCESS_KEY = '08f63af7-a6fb-429c-87a9-abfd63735b96'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})
  const [sendError, setSendError] = useState(false)

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Informe seu nome.'
    if (!form.email.includes('@')) errs.email = 'Informe um e-mail válido.'
    if (form.message.trim().length < 10) errs.message = 'Escreva uma mensagem um pouco mais detalhada.'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)
    setSendError(false)

    let emailSent = false
    if (WEB3FORMS_ACCESS_KEY !== 'COLE_SUA_ACCESS_KEY_AQUI') {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Novo contato pelo site — ${form.name}`,
            from_name: 'Jesus Voltará — Formulário de Contato',
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        })
        const data = await res.json()
        emailSent = res.ok && data.success
      } catch {
        emailSent = false
      }
    }

    // Guarda sempre um histórico local também, como registro de apoio
    const list = JSON.parse(localStorage.getItem('palavraviva_contacts') || '[]')
    list.push({ ...form, date: new Date().toISOString(), emailSent })
    localStorage.setItem('palavraviva_contacts', JSON.stringify(list))

    setSending(false)
    setForm({ name: '', email: '', message: '' })

    if (emailSent) {
      setSent(true)
    } else {
      setSendError(true)
    }
  }

  return (
    <div className="container page-section" style={{ maxWidth: 560 }}>
      <span className="eyebrow">Fale conosco</span>
      <h1>Contato</h1>
      <p style={{ marginBottom: 'var(--sp-4)' }}>
        Tem uma palavra de testemunho, uma sugestão de tema ou apenas quer dizer olá? Escreva para nós.
      </p>

      {sent && (
        <div style={{ background: 'var(--accent-bg)', color: 'var(--accent)', padding: '1em', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--sp-3)' }}>
          Mensagem enviada com sucesso! Em breve retornaremos o contato.
        </div>
      )}

      {sendError && (
        <div style={{ background: '#f7e3e0', color: '#c0564a', padding: '1em', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--sp-3)' }}>
          Não foi possível enviar o e-mail agora (verifique se a chave do Web3Forms já foi configurada). Sua mensagem ficou salva localmente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Nome</label>
          <input id="name" value={form.name} onChange={handleChange('name')} placeholder="Seu nome" />
          {errors.name && <p style={{ color: '#c0564a', fontSize: 'var(--fs-xs)', marginTop: '0.3em' }}>{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={form.email} onChange={handleChange('email')} placeholder="voce@email.com" />
          {errors.email && <p style={{ color: '#c0564a', fontSize: 'var(--fs-xs)', marginTop: '0.3em' }}>{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="message">Mensagem</label>
          <textarea id="message" value={form.message} onChange={handleChange('message')} placeholder="Escreva sua mensagem..." />
          {errors.message && <p style={{ color: '#c0564a', fontSize: 'var(--fs-xs)', marginTop: '0.3em' }}>{errors.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar mensagem'}
        </button>
      </form>
    </div>
  )
}
