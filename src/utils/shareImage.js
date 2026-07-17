function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let current = ''

  words.forEach((word) => {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  })
  if (current) lines.push(current)
  return lines
}

export function generateVerseImage({ verseText, verseRef, siteName = 'Jesus Voltará' }) {
  const size = 1080
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Fundo gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#1A3A3A')
  gradient.addColorStop(0.55, '#2D6A6A')
  gradient.addColorStop(1, '#C9A84C')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Textura sutil (círculo decorativo)
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size * 0.42, 0, Math.PI * 2)
  ctx.stroke()

  // Aspas decorativas
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.font = 'italic 700 160px "Playfair Display", serif'
  ctx.textAlign = 'center'
  ctx.fillText('“', size / 2, 260)

  // Texto do versículo
  ctx.fillStyle = '#FAFAF7'
  ctx.font = 'italic 500 52px "Playfair Display", serif'
  ctx.textAlign = 'center'

  const maxWidth = size - 200
  const lines = wrapText(ctx, verseText, maxWidth)
  const lineHeight = 68
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2

  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, startY + i * lineHeight)
  })

  // Referência
  ctx.font = '600 32px "Inter", sans-serif'
  ctx.fillStyle = '#C9A84C'
  ctx.fillText(verseRef.toUpperCase(), size / 2, startY + lines.length * lineHeight + 50)

  // Marca d'água
  ctx.font = '600 26px "Inter", sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fillText(siteName, size / 2, size - 70)

  return canvas
}

export function downloadCanvasAsImage(canvas, filename = 'versiculo.png') {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
