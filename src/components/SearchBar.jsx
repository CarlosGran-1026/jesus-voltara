export default function SearchBar({ value, onChange, placeholder = 'Buscar por palavra, título ou referência...' }) {
  return (
    <div style={{ position: 'relative' }}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar mensagens"
        style={{
          width: '100%',
          padding: '0.85em 1em 0.85em 2.6em',
          borderRadius: '999px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-elevated)',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )
}
