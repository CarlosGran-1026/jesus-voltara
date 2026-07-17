import { useRef, useState } from 'react'
import { generateVerseImage, downloadCanvasAsImage } from '@/utils/shareImage'

export default function VerseImageGenerator({ verseText, verseRef: verseReference }) {
  const previewRef = useRef(null)
  const [ready, setReady] = useState(false)
  const canvasHolder = useRef(null)

  const handleGenerate = () => {
    const canvas = generateVerseImage({ verseText, verseRef: verseReference })
    canvasHolder.current = canvas

    if (previewRef.current) {
      previewRef.current.innerHTML = ''
      canvas.style.width = '100%'
      canvas.style.height = 'auto'
      canvas.style.display = 'block'
      previewRef.current.appendChild(canvas)
    }
    setReady(true)
  }

  const handleDownload = () => {
    if (canvasHolder.current) {
      downloadCanvasAsImage(canvasHolder.current, 'versiculo-palavra-viva.png')
    }
  }

  return (
    <div style={{ marginTop: 'var(--sp-3)' }}>
      {!ready && (
        <button className="btn btn-outline btn-sm" onClick={handleGenerate}>
          Gerar imagem para compartilhar
        </button>
      )}
      {ready && (
        <div>
          <div
            ref={previewRef}
            style={{
              maxWidth: 260,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 10px 30px -12px hsla(var(--shadow-color), 0.4)',
              marginBottom: 'var(--sp-2)',
            }}
          />
          <div style={{ display: 'flex', gap: 'var(--sp-1)' }}>
            <button className="btn btn-gold btn-sm" onClick={handleDownload}>
              Baixar imagem
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleGenerate}>
              Gerar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
