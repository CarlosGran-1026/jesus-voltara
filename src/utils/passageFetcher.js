import { bibleBookApiMap, singleChapterBooks } from '@/data/bibleBookApiMap'

const API_BASE = 'https://www.abibliadigital.com.br/api'
const TRANSLATION = 'acf' // Almeida Corrigida Fiel

// Opcional: gere um token gratuito em abibliadigital.com.br (não exige cartão)
// e cole aqui para remover o limite de 20 requisições/hora por visitante.
// Sem token, o site funciona normalmente, só com esse limite por IP.
const API_TOKEN = ''

function authHeaders() {
  return API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}
}

const tokens = Object.keys(bibleBookApiMap).sort((a, b) => b.length - a.length)

// Interpreta referências como "Sl 56-59", "Mt 5.1-20", "1 Co 10.14-11.1", "Jd 1-25"
export function parseReference(ref) {
  const token = tokens.find((t) => ref === t || ref.startsWith(`${t} `))
  if (!token) return null

  const abbrev = bibleBookApiMap[token]
  const locator = ref.slice(token.length).trim()
  const isSingleChapterBook = singleChapterBooks.has(abbrev)

  let m = locator.match(/^(\d+)$/)
  if (m) {
    return { abbrev, chapterRanges: [{ start: Number(m[1]), end: Number(m[1]) }] }
  }

  m = locator.match(/^(\d+)-(\d+)$/)
  if (m) {
    if (isSingleChapterBook) {
      return { abbrev, verseRanges: [{ chapter: 1, start: Number(m[1]), end: Number(m[2]) }] }
    }
    return { abbrev, chapterRanges: [{ start: Number(m[1]), end: Number(m[2]) }] }
  }

  m = locator.match(/^(\d+)\.(\d+)$/)
  if (m) {
    return { abbrev, verseRanges: [{ chapter: Number(m[1]), start: Number(m[2]), end: Number(m[2]) }] }
  }

  m = locator.match(/^(\d+)\.(\d+)-(\d+)$/)
  if (m) {
    return { abbrev, verseRanges: [{ chapter: Number(m[1]), start: Number(m[2]), end: Number(m[3]) }] }
  }

  m = locator.match(/^(\d+)\.(\d+)-(\d+)\.(\d+)$/)
  if (m) {
    const c1 = Number(m[1])
    const v1 = Number(m[2])
    const c2 = Number(m[3])
    const v2 = Number(m[4])
    const ranges = []
    if (c1 === c2) {
      ranges.push({ chapter: c1, start: v1, end: v2 })
    } else {
      ranges.push({ chapter: c1, start: v1, end: null })
      for (let c = c1 + 1; c < c2; c++) ranges.push({ chapter: c, start: null, end: null })
      ranges.push({ chapter: c2, start: null, end: v2 })
    }
    return { abbrev, verseRanges: ranges }
  }

  return null
}

async function fetchChapter(abbrev, chapter) {
  const cacheKey = `biblia_cache_${TRANSLATION}_${abbrev}_${chapter}`
  const cached = sessionStorage.getItem(cacheKey)
  if (cached) return JSON.parse(cached)

  const res = await fetch(`${API_BASE}/verses/${TRANSLATION}/${abbrev}/${chapter}`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error(`Não foi possível carregar ${abbrev} ${chapter}`)
  const data = await res.json()
  sessionStorage.setItem(cacheKey, JSON.stringify(data))
  return data
}

// Retorna [{ chapter, bookName, verses: [{number, text}] }, ...]
export async function fetchPassage(ref) {
  const parsed = parseReference(ref)
  if (!parsed) throw new Error('Referência não reconhecida')

  const blocks = []

  if (parsed.chapterRanges) {
    for (const range of parsed.chapterRanges) {
      for (let c = range.start; c <= range.end; c++) {
        const data = await fetchChapter(parsed.abbrev, c)
        blocks.push({ chapter: c, bookName: data.book?.name, verses: data.verses })
      }
    }
  } else if (parsed.verseRanges) {
    for (const range of parsed.verseRanges) {
      const data = await fetchChapter(parsed.abbrev, range.chapter)
      const filtered = data.verses.filter((v) => {
        if (range.start !== null && v.number < range.start) return false
        if (range.end !== null && v.number > range.end) return false
        return true
      })
      blocks.push({ chapter: range.chapter, bookName: data.book?.name, verses: filtered })
    }
  }

  return blocks
}
