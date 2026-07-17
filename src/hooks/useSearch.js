import { useMemo, useState } from 'react'

export function useSearch(messages) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [book, setBook] = useState('')
  const [sort, setSort] = useState('recent')

  const results = useMemo(() => {
    let filtered = messages

    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.verseText.toLowerCase().includes(q) ||
          m.body.toLowerCase().includes(q) ||
          m.verseRef.toLowerCase().includes(q)
      )
    }

    if (category) filtered = filtered.filter((m) => m.category === category)
    if (book) filtered = filtered.filter((m) => m.book === book)

    filtered = [...filtered].sort((a, b) =>
      sort === 'recent' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    )

    return filtered
  }, [messages, query, category, book, sort])

  return { query, setQuery, category, setCategory, book, setBook, sort, setSort, results }
}
