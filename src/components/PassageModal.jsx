import { useEffect, useState } from 'react'
import { fetchPassage } from '@/utils/passageFetcher'

export default function PassageModal({ reference, onClose }) {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetchPassage(reference)
      .then((result) => {
        if (cancelled) return
        if (!result.length || result.every((b) => !b.verses?.length)) {
          setStatus('error')
          return
        }
        setBlocks(result)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [reference])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const searchUrl = `https://www.bibliaonline.com.br/acf/busca?q=${encodeURIComponent(reference)}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Texto de ${reference}`}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(15, 15, 20, 0.6)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fade-in"
        style={{
          background: 'var(--bg-elevated)',
          width: '100%',
          maxWidth: 640,
          maxHeight: '85vh',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -10px 40px hsla(var(--shadow-color), 0.4)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--sp-2) var(--sp-3)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 'var(--fs-md)' }}>{reference}</h3>
          <button className="btn-icon" onClick={onClose} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div style={{ padding: 'var(--sp-3)', overflowY: 'auto' }}>
          {status === 'loading' && (
            <p style={{ color: 'var(--text-muted)' }}>Carregando o texto...</p>
          )}

          {status === 'error' && (
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>
                Não foi possível carregar o texto agora (pode ser instabilidade momentânea do serviço, ou limite de
                requisições atingido).
              </p>
              <a className="btn btn-outline btn-sm" href={searchUrl} target="_blank" rel="noopener noreferrer">
                Abrir {reference} em outra aba
              </a>
            </div>
          )}

          {status === 'ready' &&
            blocks.map((block, i) => (
              <div key={i} style={{ marginBottom: 'var(--sp-3)' }}>
                {blocks.length > 1 && (
                  <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5em' }}>
                    {block.bookName} {block.chapter}
                  </p>
                )}
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontFamily: 'var(--font-display)', fontSize: 'var(--fs-md)' }}>
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

        <div style={{ padding: '0.6em var(--sp-3)', borderTop: '1px solid var(--border-subtle)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
          Texto: Almeida Corrigida Fiel (ACF) — via abibliadigital.com.br
        </div>
      </div>
    </div>
  )
}
