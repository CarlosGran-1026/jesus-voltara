import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMessages } from '@/hooks/useMessages'
import CategoryBadge from '@/components/CategoryBadge'
import ShareButtons from '@/components/ShareButtons'
import VerseImageGenerator from '@/components/VerseImageGenerator'
import ViewCounter from '@/components/ViewCounter'
import MessageCard from '@/components/MessageCard'
import { formatDate } from '@/utils/date'

export default function MessageDetail() {
  const { slug } = useParams()
  const { messages, getBySlug, incrementViews } = useMessages()
  const message = getBySlug(slug)
  const countedRef = useRef(false)

  useEffect(() => {
    if (message && !countedRef.current) {
      countedRef.current = true
      incrementViews(message.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message?.id])

  if (!message) {
    return (
      <div className="container page-section empty-state">
        <h2>Mensagem não encontrada</h2>
        <p>A mensagem que você procura pode ter sido removida.</p>
        <Link to="/mensagens" className="btn btn-primary">Ver todas as mensagens</Link>
      </div>
    )
  }

  const related = messages.filter((m) => m.category === message.category && m.id !== message.id).slice(0, 3)

  return (
    <article className="container page-section" style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 'var(--sp-2)' }}>
        <CategoryBadge slug={message.category} />
      </div>

      <h1 style={{ marginBottom: '0.4em' }}>{message.title}</h1>

      <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <time dateTime={message.date}>{formatDate(message.date)}</time>
        <span>·</span>
        <span>{message.book}</span>
        <span>·</span>
        <ViewCounter views={message.views} />
      </div>

      <div
        style={{
          background: message.cover,
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--sp-5) var(--sp-4)',
          marginBottom: 'var(--sp-4)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'var(--fs-xl)',
            color: '#FAFAF7',
            margin: '0 0 0.5em',
          }}
        >
          “{message.verseText}”
        </p>
        <p style={{ color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
          {message.verseRef.toUpperCase()}
        </p>
      </div>

      <div style={{ fontSize: 'var(--fs-md)', lineHeight: 1.8, color: 'var(--text-primary)' }}>
        {message.body.split('\n\n').map((para, i) => (
          <p key={i} style={{ color: 'var(--text-primary)' }}>{para}</p>
        ))}
      </div>

      <div style={{ marginTop: 'var(--sp-4)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--border-subtle)' }}>
        <h4 style={{ marginBottom: '0.6em' }}>Compartilhar esta mensagem</h4>
        <ShareButtons title={message.title} />
        <VerseImageGenerator verseText={message.verseText} verseRef={message.verseRef} />
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 'var(--sp-6)' }}>
          <h3 style={{ marginBottom: 'var(--sp-3)' }}>Mensagens relacionadas</h3>
          <div className="grid grid-3">
            {related.map((m) => (
              <MessageCard key={m.id} message={m} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
