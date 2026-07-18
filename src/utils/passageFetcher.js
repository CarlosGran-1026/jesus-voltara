import { bibleBookIdMap, singleChapterBooks } from '@/data/bibleBookIdMap'

const CDN_BASE = 'https://raw.githubusercontent.com/maatheusgois/bible/main/versions/pt-br/acf'
export const TRANSLATION_LABEL = 'Almeida Corrigida Fiel (ACF)'

const tokens = Object.keys(bibleBookIdMap).sort((a, b) => b.length - a.length)

// Interpreta referências como "Sl 56-59", "Mt 5.1-20", "1 Co 10.14-11.1", "Jd 1-25"
export function parseReference(ref) {
  const token = tokens.find((t) => ref === t || ref.startsWith(`${t} `))
  if (!token) return null

  const bookId = bibleBookIdMap[token]
  const locator = ref.slice(token.length).trim()
  const isSingleChapterBook = singleChapterBooks.has(bookId)

  let m = locator.match(/^(\d+)$/)
  if (m) {
    return { bookId, chapterRanges: [{ start: Number(m[1]), end: Number(m[1]) }] }
  }

  m = locator.match(/^(\d+)-(\d+)$/)
  if (m) {
    if (isSingleChapterBook) {
      return { bookId, verseRanges: [{ chapter: 1, start: Number(m[1]), end: Number(m[2]) }] }
    }
    return { bookId, chapterRanges: [{ start: Number(m[1]), end: Number(m[2]) }] }
  }

  m = locator.match(/^(\d+)\.(\d+)$/)
  if (m) {
    return { bookId, verseRanges: [{ chapter: Number(m[1]), start: Number(m[2]), end: Number(m[2]) }] }
  }

  m = locator.match(/^(\d+)\.(\d+)-(\d+)$/)
  if (m) {
    return { bookId, verseRanges: [{ chapter: Number(m[1]), start: Number(m[2]), end: Number(m[3]) }] }
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
    return { bookId, verseRanges: ranges }
  }

  return null
}

function stripBom(text) {
  return text.replace(/^\uFEFF/, '')
}

const bookMemCache = new Map()

async function fetchBook(bookId) {
  if (bookMemCache.has(bookId)) return bookMemCache.get(bookId)

  const storageKey = `biblia_book_acf_${bookId}`
  const stored = sessionStorage.getItem(storageKey)
  if (stored) {
    const data = JSON.parse(stored)
    bookMemCache.set(bookId, data)
    return data
  }

  const res = await fetch(`${CDN_BASE}/${bookId}/${bookId}.json`)
  if (!res.ok) throw new Error(`Não foi possível carregar o livro ${bookId}`)
  const data = JSON.parse(stripBom(await res.text()))

  bookMemCache.set(bookId, data)
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(data))
  } catch {
    // sessionStorage cheio — segue funcionando só com cache em memória
  }
  return data
}

// Retorna [{ chapter, bookName, verses: [{number, text}] }, ...]
export async function fetchPassage(ref) {
  const parsed = parseReference(ref)
  if (!parsed) throw new Error('Referência não reconhecida')

  const book = await fetchBook(parsed.bookId)
  const blocks = []

  if (parsed.chapterRanges) {
    for (const range of parsed.chapterRanges) {
      for (let c = range.start; c <= range.end; c++) {
        const chapterVerses = book.chapters[c - 1]
        if (!chapterVerses) continue
        blocks.push({
          chapter: c,
          bookName: book.name,
          verses: chapterVerses.map((text, i) => ({ number: i + 1, text })),
        })
      }
    }
  } else if (parsed.verseRanges) {
    for (const range of parsed.verseRanges) {
      const chapterVerses = book.chapters[range.chapter - 1] || []
      const filtered = chapterVerses
        .map((text, i) => ({ number: i + 1, text }))
        .filter((v) => {
          if (range.start !== null && v.number < range.start) return false
          if (range.end !== null && v.number > range.end) return false
          return true
        })
      blocks.push({ chapter: range.chapter, bookName: book.name, verses: filtered })
    }
  }

  return blocks
}

// --- Busca por palavra/frase em toda a Bíblia ---

let fullBibleMemCache = null

function normalizeText(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

async function fetchFullBible() {
  if (fullBibleMemCache) return fullBibleMemCache

  const storageKey = 'biblia_full_acf'
  const stored = sessionStorage.getItem(storageKey)
  if (stored) {
    fullBibleMemCache = JSON.parse(stored)
    return fullBibleMemCache
  }

  const res = await fetch(`${CDN_BASE}.json`)
  if (!res.ok) throw new Error('Não foi possível carregar a Bíblia completa')
  const text = stripBom(await res.text())
  const data = JSON.parse(text)

  fullBibleMemCache = data
  try {
    sessionStorage.setItem(storageKey, text)
  } catch {
    // arquivo grande — se não couber no sessionStorage, segue só em memória
  }
  return data
}

// Busca uma palavra/frase em todos os 66 livros. Não diferencia maiúsculas/
// acentos (buscar "fe" também encontra "fé"). Retorna até `limit` resultados
// e o total real de ocorrências encontradas.
export async function searchBibleWord(term, { limit = 40 } = {}) {
  const needle = normalizeText(term.trim())
  if (!needle) return { total: 0, results: [] }

  const bible = await fetchFullBible()
  const results = []
  let total = 0

  for (const book of bible) {
    for (let chapterIdx = 0; chapterIdx < book.chapters.length; chapterIdx++) {
      const verses = book.chapters[chapterIdx]
      for (let verseIdx = 0; verseIdx < verses.length; verseIdx++) {
        const text = verses[verseIdx]
        if (normalizeText(text).includes(needle)) {
          total += 1
          if (results.length < limit) {
            results.push({
              bookId: book.id,
              bookName: book.name,
              chapter: chapterIdx + 1,
              verse: verseIdx + 1,
              text,
              reference: `${book.name} ${chapterIdx + 1}:${verseIdx + 1}`,
            })
          }
        }
      }
    }
  }

  return { total, results }
}
