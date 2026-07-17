export default function ViewCounter({ views }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4em', color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views || 0} leituras
    </span>
  )
}
