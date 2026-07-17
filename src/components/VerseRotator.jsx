import { useEffect, useState } from 'react'

export default function VerseRotator({ messages }) {
  const [index, setIndex] = useState(0)
  const pool = messages.slice(0, 8)

  useEffect(() => {
    if (pool.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % pool.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [pool.length])

  if (!pool.length) return null
  const current = pool[index]

  return (
    <div
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: 'var(--sp-3) 0',
        overflow: 'hidden',
      }}
    >
      <div className="container text-center">
        <p
          key={current.id}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'var(--fs-md)',
            color: 'var(--text-primary)',
            margin: 0,
            animation: 'fadeIn 0.8s ease',
          }}
        >
          “{current.verseText}” <span style={{ color: 'var(--accent-gold)', fontStyle: 'normal', fontSize: 'var(--fs-xs)', fontWeight: 700 }}>— {current.verseRef}</span>
        </p>
      </div>
    </div>
  )
}
