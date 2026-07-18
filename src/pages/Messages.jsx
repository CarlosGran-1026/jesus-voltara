import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMessages } from '@/hooks/useMessages'
import { useSearch } from '@/hooks/useSearch'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import MessageCard from '@/components/MessageCard'

const PAGE_SIZE = 6

export default function Messages() {
  const { messages } = useMessages()
  const { query, setQuery, category, setCategory, book, setBook, sort, setSort, results } = useSearch(messages)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const shown = results.slice(0, visible)

  return (
    <div className="container page-section">
      <span className="eyebrow">Acervo completo</span>
      <h1>Mensagens & Devocionais</h1>
      <p style={{ maxWidth: 600, marginBottom: 'var(--sp-4)' }}>
        Explore todas as reflexões publicadas, filtre por tema ou livro bíblico e encontre a mensagem certa para o seu momento.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)' }}>
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar category={category} setCategory={setCategory} book={book} setBook={setBook} sort={sort} setSort={setSort} />
      </div>

      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: 'var(--sp-3)' }}>
        {results.length} mensagem{results.length !== 1 ? 'ns' : ''} encontrada{results.length !== 1 ? 's' : ''}
      </p>

      {shown.length > 0 ? (
        <>
          <div className="grid grid-3">
            {shown.map((m) => (
              <MessageCard key={m.id} message={m} />
            ))}
          </div>

          {visible < results.length && (
            <div className="text-center" style={{ marginTop: 'var(--sp-4)' }}>
              <button className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Carregar mais mensagens
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>Nenhuma mensagem encontrada com esses filtros. Tente ajustar sua busca.</p>
          {query.trim() && (
            <Link to={`/buscar?q=${encodeURIComponent(query.trim())}`} className="btn btn-outline" style={{ marginTop: 'var(--sp-2)' }}>
              Buscar "{query.trim()}" na Bíblia completa
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
