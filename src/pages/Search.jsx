import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMessages } from '@/hooks/useMessages'

function highlight(text, term) {
  if (!term) return text
  const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={i} style={{ background: 'var(--accent-gold-soft)', color: 'inherit', padding: '0 0.15em', borderRadius: '3px' }}>
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function Search() {
  const { messages } = useMessages()
  const [term, setTerm] = useState('')

  const results = term.trim()
    ? messages.filter(
        (m) =>
          m.verseText.toLowerCase().includes(term.toLowerCase()) ||
          m.verseRef.toLowerCase().includes(term.toLowerCase()) ||
          m.title.toLowerCase().includes(term.toLowerCase())
      )
    : []

  return (
    <div className="container page-section" style={{ maxWidth: 720 }}>
      <span className="eyebrow">Busca de versículo</span>
      <h1>Buscar por versículo ou palavra-chave</h1>
      <p style={{ marginBottom: 'var(--sp-3)' }}>
        Digite uma palavra, tema ou referência bíblica (ex: "paz" ou "Romanos 8").
      </p>

      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Ex: fé, esperança, Filipenses 4..."
        aria-label="Buscar versículo"
        style={{
          width: '100%',
          padding: '0.9em 1.2em',
          borderRadius: '999px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-elevated)',
          color: 'var(--text-primary)',
          fontSize: 'var(--fs-md)',
          marginBottom: 'var(--sp-4)',
        }}
      />

      {term.trim() && (
        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: 'var(--sp-2)' }}>
          {results.length} resultado{results.length !== 1 ? 's' : ''} para "{term}"
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
        {results.map((m) => (
          <Link
            key={m.id}
            to={`/mensagens/${m.slug}`}
            className="card"
            style={{ padding: 'var(--sp-3)', display: 'block' }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)', margin: '0 0 0.3em' }}>
              “{highlight(m.verseText, term)}”
            </p>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>{m.verseRef.toUpperCase()}</span>
            <span style={{ display: 'block', marginTop: '0.3em', color: 'var(--text-secondary)' }}>{highlight(m.title, term)}</span>
          </Link>
        ))}
      </div>

      {term.trim() && results.length === 0 && (
        <div className="empty-state">
          <p>Nenhum resultado encontrado. Tente outra palavra-chave.</p>
        </div>
      )}
    </div>
  )
}
