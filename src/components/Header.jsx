import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/', label: 'Início' },
  { to: '/mensagens', label: 'Mensagens' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/buscar', label: 'Buscar' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1em 1em' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6em', textDecoration: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="var(--accent)" />
            <path d="M14 22c6-4 12-4 18 0v26c-6-4-12-4-18 0V22z" fill="var(--bg-elevated)" opacity="0.95" />
            <path d="M50 22c-6-4-12-4-18 0v26c6-4 12-4 18 0V22z" fill="var(--bg-elevated)" opacity="0.8" />
            <path d="M32 8c2.5 3.5 4 6 4 8.5 0 2.2-1.8 3.5-4 3.5s-4-1.3-4-3.5C28 14 29.5 11.5 32 8z" fill="var(--accent-gold)" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-md)', color: 'var(--text-primary)' }}>
            Jesus Voltará
          </span>
        </Link>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                fontSize: 'var(--fs-sm)',
                fontWeight: 600,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6em' }}>
          <ThemeToggle />
          <button
            className="btn-icon mobile-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav container" style={{ display: 'flex', flexDirection: 'column', gap: '0.2em', paddingBottom: '1em' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                padding: '0.7em 0.4em',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
