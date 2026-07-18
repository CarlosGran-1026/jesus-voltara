import { useState } from 'react'
import { useMessages } from '@/hooks/useMessages'
import { categories } from '@/data/categories'
import { bibleBooks } from '@/data/bibleBooks'
import { formatDate } from '@/utils/date'

const ADMIN_USERNAME = 'JesusVoltara'
const ADMIN_PASSWORD = 'Jesus#2026'
const SESSION_KEY = 'palavraviva_admin_session'

const emptyForm = {
  title: '',
  verseText: '',
  verseRef: '',
  book: bibleBooks[0],
  category: categories[0].slug,
  date: new Date().toISOString().slice(0, 10),
  body: '',
}

function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onSuccess()
    } else {
      setError('Usuário ou senha incorretos. Tente novamente.')
    }
  }

  return (
    <div className="container page-section" style={{ maxWidth: 400 }}>
      <span className="eyebrow">Área restrita</span>
      <h1>Painel Administrativo</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o usuário"
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a senha de acesso"
          />
          {error && <p style={{ color: '#c0564a', fontSize: 'var(--fs-xs)', marginTop: '0.3em' }}>{error}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  )
}

function MessageForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm)

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
      <h3 style={{ marginBottom: 'var(--sp-2)' }}>{initial?.id ? 'Editar mensagem' : 'Nova mensagem'}</h3>

      <div className="field">
        <label htmlFor="f-title">Título</label>
        <input id="f-title" required value={form.title} onChange={handleChange('title')} placeholder="Título da mensagem" />
      </div>

      <div className="grid grid-2">
        <div className="field">
          <label htmlFor="f-verseRef">Referência bíblica</label>
          <input id="f-verseRef" required value={form.verseRef} onChange={handleChange('verseRef')} placeholder="Ex: João 3:16" />
        </div>
        <div className="field">
          <label htmlFor="f-book">Livro bíblico</label>
          <select id="f-book" value={form.book} onChange={handleChange('book')}>
            {bibleBooks.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-verseText">Texto do versículo</label>
        <textarea id="f-verseText" required value={form.verseText} onChange={handleChange('verseText')} placeholder="Texto do versículo base" style={{ minHeight: 70 }} />
      </div>

      <div className="grid grid-2">
        <div className="field">
          <label htmlFor="f-category">Categoria</label>
          <select id="f-category" value={form.category} onChange={handleChange('category')}>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-date">Data de publicação</label>
          <input id="f-date" type="date" value={form.date} onChange={handleChange('date')} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-body">Texto da reflexão</label>
        <textarea id="f-body" required value={form.body} onChange={handleChange('body')} placeholder="Corpo da reflexão (separe parágrafos com linha em branco)" style={{ minHeight: 220 }} />
      </div>

      <div style={{ display: 'flex', gap: '0.6em' }}>
        <button type="submit" className="btn btn-primary">Salvar mensagem</button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}

function Dashboard() {
  const { messages, addMessage, updateMessage, deleteMessage } = useMessages()
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  const handleSave = (data) => {
    const cover = 'linear-gradient(135deg, #2D6A6A 0%, #C9A84C 140%)'
    if (editing) {
      updateMessage(editing.id, { ...data, cover: editing.cover || cover })
      setEditing(null)
    } else {
      addMessage({ ...data, cover })
      setCreating(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    window.location.reload()
  }

  return (
    <div className="container page-section">
      <div className="section-head">
        <div>
          <span className="eyebrow">Painel administrativo</span>
          <h1 className="mt-0">Gerenciar mensagens</h1>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>Sair</button>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="card" style={{ padding: 'var(--sp-3)' }}>
          <span className="eyebrow">Total</span>
          <h2 className="mt-0">{messages.length}</h2>
          <p style={{ margin: 0 }}>mensagens publicadas</p>
        </div>
        <div className="card" style={{ padding: 'var(--sp-3)' }}>
          <span className="eyebrow">Categorias</span>
          <h2 className="mt-0">{categories.length}</h2>
          <p style={{ margin: 0 }}>temas disponíveis</p>
        </div>
        <div className="card" style={{ padding: 'var(--sp-3)' }}>
          <span className="eyebrow">Leituras</span>
          <h2 className="mt-0">{messages.reduce((sum, m) => sum + (m.views || 0), 0)}</h2>
          <p style={{ margin: 0 }}>visualizações acumuladas</p>
        </div>
      </div>

      {!creating && !editing && (
        <button className="btn btn-primary" style={{ marginBottom: 'var(--sp-3)' }} onClick={() => setCreating(true)}>
          + Nova mensagem
        </button>
      )}

      {creating && <MessageForm onSave={handleSave} onCancel={() => setCreating(false)} />}
      {editing && <MessageForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6em' }}>
        {messages.map((m) => (
          <div
            key={m.id}
            className="card"
            style={{ padding: 'var(--sp-2) var(--sp-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1em', flexWrap: 'wrap' }}
          >
            <div>
              <strong>{m.title}</strong>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                {formatDate(m.date)} · {m.book} · {m.views || 0} leituras
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5em' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(m)}>Editar</button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                  if (confirm(`Excluir "${m.title}"? Esta ação não pode ser desfeita.`)) deleteMessage(m.id)
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />
  return <Dashboard />
}
