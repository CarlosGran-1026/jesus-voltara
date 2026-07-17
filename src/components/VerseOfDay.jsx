import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { dayHashIndex } from '@/utils/date'

export default function VerseOfDay({ messages }) {
  const verse = useMemo(() => {
    if (!messages.length) return null
    const idx = dayHashIndex(messages.length)
    return messages[idx]
  }, [messages])

  if (!verse) return null

  return (
    <section
      className="fade-in"
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--sp-6) var(--sp-4)',
        background: 'linear-gradient(135deg, var(--accent) 0%, #1A3A3A 100%)',
        color: '#FAFAF7',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 20%, rgba(201,168,76,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(78,205,196,0.2), transparent 45%)',
        }}
      />
      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
        <span className="eyebrow" style={{ color: 'var(--accent-gold)', justifyContent: 'center' }}>
          Versículo do dia
        </span>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: '#FAFAF7',
            margin: '0.6em 0',
            lineHeight: 1.4,
          }}
        >
          “{verse.verseText}”
        </p>
        <p style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 'var(--sp-3)' }}>
          {verse.verseRef.toUpperCase()}
        </p>
        <Link to={`/mensagens/${verse.slug}`} className="btn btn-gold">
          Ler reflexão completa
        </Link>
      </div>
    </section>
  )
}
