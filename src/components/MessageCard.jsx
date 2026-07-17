import { Link } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'
import { formatDateShort } from '@/utils/date'

export default function MessageCard({ message }) {
  return (
    <article className="card fade-in">
      <Link to={`/mensagens/${message.slug}`} aria-label={message.title}>
        <div className="card-cover" style={{ background: message.cover }} />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <time dateTime={message.date}>{formatDateShort(message.date)}</time>
          <span>·</span>
          <span>{message.views || 0} leituras</span>
        </div>
        <h3 style={{ fontSize: 'var(--fs-md)', marginBottom: '0.4em' }}>
          <Link to={`/mensagens/${message.slug}`}>{message.title}</Link>
        </h3>
        <p className="card-verse">“{message.verseText}”</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8em' }}>
          <CategoryBadge slug={message.category} />
          <Link to={`/mensagens/${message.slug}`} style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>
            Ler →
          </Link>
        </div>
      </div>
    </article>
  )
}
