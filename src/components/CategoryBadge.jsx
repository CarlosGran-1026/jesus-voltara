import { Link } from 'react-router-dom'
import { getCategoryBySlug } from '@/data/categories'

export default function CategoryBadge({ slug, linkable = true }) {
  const cat = getCategoryBySlug(slug)
  if (!cat) return null

  const content = (
    <span className="badge">
      <span aria-hidden="true" style={{ marginRight: '0.4em' }}>{cat.icon}</span>
      {cat.name}
    </span>
  )

  if (!linkable) return content

  return (
    <Link to={`/categorias/${cat.slug}`} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  )
}
