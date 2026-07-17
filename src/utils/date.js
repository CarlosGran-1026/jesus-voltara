export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(dateStr) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

// Retorna um índice determinístico baseado na data (para o "versículo do dia")
export function dayHashIndex(length, dateObj = new Date()) {
  const key = `${dateObj.getFullYear()}${dateObj.getMonth()}${dateObj.getDate()}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 100000
  }
  return hash % length
}
