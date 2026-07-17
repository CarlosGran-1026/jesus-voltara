import { useState } from 'react'

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setStatus('erro')
      return
    }
    const list = JSON.parse(localStorage.getItem('palavraviva_newsletter') || '[]')
    if (!list.includes(email)) list.push(email)
    localStorage.setItem('palavraviva_newsletter', JSON.stringify(list))
    setStatus('ok')
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6em', flexWrap: 'wrap', maxWidth: compact ? 360 : 480 }}>
      <input
        type="email"
        required
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="E-mail para newsletter"
        style={{
          flex: '1 1 200px',
          padding: '0.8em 1em',
          borderRadius: '999px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-elevated)',
          color: 'var(--text-primary)',
        }}
      />
      <button type="submit" className="btn btn-gold">
        Quero receber
      </button>
      {status === 'ok' && (
        <p style={{ width: '100%', color: 'var(--accent)', fontSize: 'var(--fs-sm)', margin: 0 }}>
          Inscrição confirmada! Que essa mensagem alimente sua fé todos os dias.
        </p>
      )}
      {status === 'erro' && (
        <p style={{ width: '100%', color: '#c0564a', fontSize: 'var(--fs-sm)', margin: 0 }}>
          Digite um e-mail válido para continuar.
        </p>
      )}
    </form>
  )
}
