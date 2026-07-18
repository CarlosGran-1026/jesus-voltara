// Mapa das abreviações usadas em dailyReadingPlan.js para os códigos de livro
// esperados pela API https://www.abibliadigital.com.br/api
export const bibleBookApiMap = {
  Gn: 'gn', 'Êx': 'ex', Lv: 'lv', Nm: 'nm', Dt: 'dt',
  Js: 'js', Jz: 'jz', Rt: 'rt',
  '1 Sm': '1sm', '2 Sm': '2sm', '1 Rs': '1rs', '2 Rs': '2rs',
  '1 Cr': '1cr', '2 Cr': '2cr', Ed: 'ed', Ne: 'ne', Et: 'et',
  'Jó': 'job', Sl: 'sl', Pv: 'pv', Ec: 'ec', Ct: 'ct',
  Is: 'is', Jr: 'jr', Lm: 'lm', Ez: 'ez', Dn: 'dn',
  Os: 'os', Jl: 'jl', Am: 'am', Ob: 'ob', Jn: 'jn',
  Mq: 'mq', Na: 'na', Hc: 'hc', Sf: 'sf', Ag: 'ag',
  Zc: 'zc', Ml: 'ml',
  Mt: 'mt', Mc: 'mc', Lc: 'lc', Jo: 'jo', 'João': 'jo',
  At: 'at', Rm: 'rm', '1 Co': '1co', '2 Co': '2co',
  Gl: 'gl', Ef: 'ef', Fp: 'fp', Cl: 'cl',
  '1 Ts': '1ts', '2 Ts': '2ts', '1 Tm': '1tm', '2 Tm': '2tm',
  Tt: 'tt', Fm: 'fm', Hb: 'hb', 'Hebreus': 'hb', Tg: 'tg',
  '1 Pe': '1pe', '2 Pe': '2pe', '1 Jo': '1jo', '2 Jo': '2jo', '3 Jo': '3jo',
  Jd: 'jd', Ap: 'ap',
}

// Livros com apenas 1 capítulo — nesses casos, uma referência como "1-25"
// indica um intervalo de VERSÍCULOS (não de capítulos, que não existiriam)
export const singleChapterBooks = new Set(['ob', 'fm', '2jo', '3jo', 'jd'])
