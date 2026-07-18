// Mapa das abreviações usadas no site para os IDs de livro do acervo
// https://github.com/MaatheusGois/bible (arquivos estáticos, com suporte a CORS confirmado)
export const bibleBookIdMap = {
  Gn: 'gn', 'Êx': 'ex', Lv: 'lv', Nm: 'nm', Dt: 'dt',
  Js: 'js', Jz: 'jud', Rt: 'rt',
  '1 Sm': '1sm', '2 Sm': '2sm', '1 Rs': '1kgs', '2 Rs': '2kgs',
  '1 Cr': '1ch', '2 Cr': '2ch', Ed: 'ezr', Ne: 'ne', Et: 'et',
  'Jó': 'job', Sl: 'ps', Pv: 'prv', Ec: 'ec', Ct: 'so',
  Is: 'is', Jr: 'jr', Lm: 'lm', Ez: 'ez', Dn: 'dn',
  Os: 'ho', Jl: 'jl', Am: 'am', Ob: 'ob', Jn: 'jn',
  Mq: 'mi', Na: 'na', Hc: 'hk', Sf: 'zp', Ag: 'hg',
  Zc: 'zc', Ml: 'ml',
  Mt: 'mt', Mc: 'mk', Lc: 'lk', Jo: 'jo', 'João': 'jo',
  At: 'act', Rm: 'rm', '1 Co': '1co', '2 Co': '2co',
  Gl: 'gl', Ef: 'eph', Fp: 'ph', Cl: 'cl',
  '1 Ts': '1ts', '2 Ts': '2ts', '1 Tm': '1tm', '2 Tm': '2tm',
  Tt: 'tt', Fm: 'phm', Hb: 'hb', 'Hebreus': 'hb', Tg: 'jm',
  '1 Pe': '1pe', '2 Pe': '2pe', '1 Jo': '1jo', '2 Jo': '2jo', '3 Jo': '3jo',
  Jd: 'jd', Ap: 're',
}

// Livros com apenas 1 capítulo — "1-25" nesses casos indica um intervalo
// de VERSÍCULOS, não de capítulos
export const singleChapterBooks = new Set(['ob', 'phm', '2jo', '3jo', 'jd'])

// Nomes completos, usados como alternativa mais confiável quando o texto
// precisa ser buscado fora do site (link de apoio em caso de falha)
export const bibleBookFullNames = {
  Gn: 'Gênesis', 'Êx': 'Êxodo', Lv: 'Levítico', Nm: 'Números', Dt: 'Deuteronômio',
  Js: 'Josué', Jz: 'Juízes', Rt: 'Rute',
  '1 Sm': '1 Samuel', '2 Sm': '2 Samuel', '1 Rs': '1 Reis', '2 Rs': '2 Reis',
  '1 Cr': '1 Crônicas', '2 Cr': '2 Crônicas', Ed: 'Esdras', Ne: 'Neemias', Et: 'Ester',
  'Jó': 'Jó', Sl: 'Salmos', Pv: 'Provérbios', Ec: 'Eclesiastes', Ct: 'Cântico dos Cânticos',
  Is: 'Isaías', Jr: 'Jeremias', Lm: 'Lamentações de Jeremias', Ez: 'Ezequiel', Dn: 'Daniel',
  Os: 'Oséias', Jl: 'Joel', Am: 'Amós', Ob: 'Obadias', Jn: 'Jonas',
  Mq: 'Miquéias', Na: 'Naum', Hc: 'Habacuque', Sf: 'Sofonias', Ag: 'Ageu',
  Zc: 'Zacarias', Ml: 'Malaquias',
  Mt: 'Mateus', Mc: 'Marcos', Lc: 'Lucas', Jo: 'João', 'João': 'João',
  At: 'Atos', Rm: 'Romanos', '1 Co': '1 Coríntios', '2 Co': '2 Coríntios',
  Gl: 'Gálatas', Ef: 'Efésios', Fp: 'Filipenses', Cl: 'Colossenses',
  '1 Ts': '1 Tessalonicenses', '2 Ts': '2 Tessalonicenses', '1 Tm': '1 Timóteo', '2 Tm': '2 Timóteo',
  Tt: 'Tito', Fm: 'Filemom', Hb: 'Hebreus', 'Hebreus': 'Hebreus', Tg: 'Tiago',
  '1 Pe': '1 Pedro', '2 Pe': '2 Pedro', '1 Jo': '1 João', '2 Jo': '2 João', '3 Jo': '3 João',
  Jd: 'Judas', Ap: 'Apocalipse',
}
