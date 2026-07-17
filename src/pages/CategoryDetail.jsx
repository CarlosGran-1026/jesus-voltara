import { Link, useParams } from 'react-router-dom'
import { getCategoryBySlug } from '@/data/categories'
import { useMessages } from '@/hooks/useMessages'
import MessageCard from '@/components/MessageCard'

export default function CategoryDetail() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug)
  const { messages } = useMessages()

  if (!category) {
    return (
      <div className="container page-section empty-state">
        <h2>Categoria não encontrada</h2>
        <Link to="/categorias" className="btn btn-primary">Ver todas as categorias</Link>
      </div>
    )
  }

  const filtered = messages.filter((m) => m.category === slug)

  return (
    <div className="container page-section">
      <span className="eyebrow">Categoria</span>
      <h1>
        <span aria-hidden="true" style={{ color: 'var(--accent-gold)', marginRight: '0.3em' }}>{category.icon}</span>
        {category.name}
      </h1>
      <p style={{ maxWidth: 600, marginBottom: 'var(--sp-4)' }}>{category.description}</p>

      {filtered.length > 0 ? (
        <div className="grid grid-3">
          {filtered.map((m) => (
            <MessageCard key={m.id} message={m} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Ainda não há mensagens publicadas nesta categoria.</p>
        </div>
      )}
    </div>
  )
}
