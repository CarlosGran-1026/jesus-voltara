import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useMessages } from '@/hooks/useMessages'
import { parseReference, fetchPassage, searchBibleWord, TRANSLATION_LABEL } from '@/utils/passageFetcher'
import { bibleBookIdMap } from '@/data/bibleBookIdMap'
import PassageModal from '@/components/PassageModal'

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

// Constrói uma referência clicável (ex: "Sl 23") a partir do id do livro retornado pela busca
const bookIdToToken = Object.fromEntries(
  Object.entries(bibleBookIdMap).map(([token, id]) => [id, token])
)

export default function Search() {
  const { messages } = useMessages()
  const [searchParams, setSearchParams] = useSearchParams()
  const [term, setTerm] = useState(searchParams.get('q') || '')
  const [debounced, setDebounced] = useState(term)
  const [bibleStatus, setBibleStatus] = useState('idle') // idle | loading | ready | error
  const [passageBlocks, setPassageBlocks] = useState(null)
  const [wordResults, setWordResults] = useState(null)
  const [openRef, setOpenRef] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(term.trim()), 400)
    return () => clearTimeout(timer)
  }, [term])

  useEffect(() => {
    if (debounced) setSearchParams({ q: debounced }, { replace: true })
    else setSearchParams({}, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  useEffect(() => {
    if (!debounced) {
      setBibleStatus('idle')
      setPassageBlocks(null)
      setWordResults(null)
      return
    }

    let cancelled = false
    setBibleStatus('loading')
    setPassageBlocks(null)
    setWordResults(null)

    const parsed = parseReference(debounced)

    if (parsed) {
      fetchPassage(debounced)
        .then((blocks) => {
          if (cancelled) return
          if (!blocks.length || blocks.every((b) => !b.verses?.length)) {
            setBibleStatus('error')
            return
          }
          setPassageBlocks(blocks)
          setBibleStatus('ready')
        })
        .catch(() => !cancelled && setBibleStatus('error'))
    } else {
      searchBibleWord(debounced)
        .then((result) => {
          if (cancelled) return
          setWordResults(result)
          setBibleStatus('ready')
        })
        .catch(() => !cancelled && setBibleStatus('error'))
    }

    return () => {
      cancelled = true
    }
  }, [debounced])

  const localResults = useMemo(() => {
    if (!debounced) return []
    const q = debounced.toLowerCase()
    return messages.filter(
      (m) =>
        m.verseText.toLowerCase().includes(q) ||
        m.verseRef.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q)
    )
  }, [messages, debounced])

  return (
    <div className="container page-section" style={{ maxWidth: 720 }}>
      <span className="eyebrow">Busca na Bíblia</span>
      <h1>Buscar por palavra ou referência</h1>
      <p style={{ marginBottom: 'var(--sp-3)' }}>
        Digite uma palavra (ex: "esperança"), um tema, ou uma referência bíblica (ex: "Romanos 8" ou "Sl 23") — o
        texto vem direto da Bíblia, em {TRANSLATION_LABEL}.
      </p>

      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Ex: fé, esperança, Filipenses 4, Sl 23..."
        aria-label="Buscar na Bíblia"
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

      {debounced && bibleStatus === 'loading' && (
        <p style={{ color: 'var(--text-muted)' }}>Buscando...</p>
      )}

      {debounced && bibleStatus === 'error' && (
        <p style={{ color: 'var(--text-secondary)' }}>
          Não foi possível buscar agora. Verifique sua conexão e tente novamente em instantes.
        </p>
      )}

      {/* Resultado: referência reconhecida (ex: "Sl 23") — mostra o texto direto */}
      {passageBlocks && (
        <div className="card fade-in" style={{ padding: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
          <span className="eyebrow">{debounced}</span>
          {passageBlocks.map((block, i) => (
            <div key={i} style={{ marginBottom: 'var(--sp-2)' }}>
              {passageBlocks.length > 1 && (
                <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.4em' }}>
                  {block.bookName} {block.chapter}
                </p>
              )}
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', lineHeight: 1.8 }}>
                {block.verses.map((v) => (
                  <span key={v.number}>
                    <sup style={{ color: 'var(--accent-gold)', fontSize: '0.65em', marginRight: '0.2em' }}>{v.number}</sup>
                    {v.text}{' '}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Resultado: busca por palavra — lista de versículos com o termo em destaque */}
      {wordResults && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          {wordResults.total === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Nenhum versículo encontrado com esse termo na Bíblia.</p>
          ) : (
            <>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: 'var(--sp-2)' }}>
                {wordResults.total} versículo{wordResults.total !== 1 ? 's' : ''} encontrado{wordResults.total !== 1 ? 's' : ''}
                {wordResults.total > wordResults.results.length ? ` (mostrando os primeiros ${wordResults.results.length})` : ''}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                {wordResults.results.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setOpenRef(`${bookIdToToken[r.bookId] || r.bookName} ${r.chapter}`)}
                    className="card"
                    style={{ padding: 'var(--sp-3)', textAlign: 'left', border: 'none', cursor: 'pointer' }}
                  >
                    <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)', margin: '0 0 0.3em' }}>
                      “{highlight(r.text, debounced)}”
                    </p>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>
                      {r.reference.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Mensagens devocionais do próprio site relacionadas ao termo */}
      {debounced && localResults.length > 0 && (
        <div>
          <h3 style={{ fontSize: 'var(--fs-md)', marginBottom: 'var(--sp-2)' }}>Reflexões do site sobre isso</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {localResults.map((m) => (
              <Link key={m.id} to={`/mensagens/${m.slug}`} className="card" style={{ padding: 'var(--sp-3)', display: 'block' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-primary)', margin: '0 0 0.3em' }}>
                  “{highlight(m.verseText, debounced)}”
                </p>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: 'var(--fs-xs)' }}>{m.verseRef.toUpperCase()}</span>
                <span style={{ display: 'block', marginTop: '0.3em', color: 'var(--text-secondary)' }}>{highlight(m.title, debounced)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {openRef && <PassageModal reference={openRef} onClose={() => setOpenRef(null)} />}
    </div>
  )
}
