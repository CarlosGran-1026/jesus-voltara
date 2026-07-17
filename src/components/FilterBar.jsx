import { categories } from '@/data/categories'
import { bibleBooks } from '@/data/bibleBooks'

export default function FilterBar({ category, setCategory, book, setBook, sort, setSort }) {
  const selectStyle = {
    padding: '0.7em 1em',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-subtle)',
    background: 'var(--bg-elevated)',
    color: 'var(--text-primary)',
  }

  return (
    <div style={{ display: 'flex', gap: 'var(--sp-1)', flexWrap: 'wrap' }}>
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={selectStyle} aria-label="Filtrar por tema">
        <option value="">Todos os temas</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select value={book} onChange={(e) => setBook(e.target.value)} style={selectStyle} aria-label="Filtrar por livro bíblico">
        <option value="">Todos os livros</option>
        {bibleBooks.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle} aria-label="Ordenar por data">
        <option value="recent">Mais recentes</option>
        <option value="oldest">Mais antigas</option>
      </select>
    </div>
  )
}
