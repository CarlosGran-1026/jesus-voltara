import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { useMessages } from '@/hooks/useMessages'

export default function Categories() {
  const { messages } = useMessages()

  return (
    <div className="container page-section">
      <span className="eyebrow">Temas</span>
      <h1>Categorias</h1>
      <p style={{ maxWidth: 600, marginBottom: 'var(--sp-4)' }}>
        Cada tema reúne mensagens pensadas para um momento específico da vida. Escolha o que ressoa com o que você vive hoje.
      </p>

      <div className="grid grid-3">
        {categories.map((c) => {
          const count = messages.filter((m) => m.category === c.slug).length
          return (
            <Link
              key={c.slug}
              to={`/categorias/${c.slug}`}
              className="card"
              style={{ padding: 'var(--sp-3)', display: 'block', textDecoration: 'none' }}
            >
              <span style={{ fontSize: '1.8rem', color: 'var(--accent-gold)' }} aria-hidden="true">
                {c.icon}
              </span>
              <h3 style={{ margin: '0.4em 0 0.2em', color: 'var(--text-primary)' }}>{c.name}</h3>
              <p style={{ marginBottom: '0.6em' }}>{c.description}</p>
              <span className="badge">{count} mensage{count !== 1 ? 'ns' : 'm'}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
