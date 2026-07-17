import { useState } from 'react'

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || window.location.href

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silencioso — clipboard pode estar indisponível
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} — ${shareUrl}`)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

  return (
    <div style={{ display: 'flex', gap: 'var(--sp-1)', flexWrap: 'wrap', alignItems: 'center' }}>
      <a
        className="btn btn-outline btn-sm"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no WhatsApp"
      >
        WhatsApp
      </a>
      <a
        className="btn btn-outline btn-sm"
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no Facebook"
      >
        Facebook
      </a>
      <button className="btn btn-outline btn-sm" onClick={handleCopy}>
        {copied ? 'Link copiado ✓' : 'Copiar link'}
      </button>
    </div>
  )
}
