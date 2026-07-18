import { dailyReadingPlan } from '@/data/dailyReadingPlan'

export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Monta o plano do ano a partir dos dados fixos do calendário (AT + NT por dia).
// O calendário é genérico (mês/dia), então o 29/02 aparece sempre, mesmo em anos
// não bissextos — nesses casos ele não corresponde a uma data real do calendário,
// por isso usamos um identificador estável em vez de um objeto Date (que arredondaria
// para 1º de março). Isso não afeta a marcação de "hoje", que segue funcionando normalmente.
export function generateReadingPlan(year) {
  const leap = isLeapYear(year)
  const plan = []
  let dayOfYear = 0

  dailyReadingPlan.forEach((month, monthIndex) => {
    month.days.forEach((entry) => {
      dayOfYear += 1

      const isRealDate = !entry.leapOnly || leap
      const isoDate = isRealDate
        ? toISODate(new Date(year, monthIndex, entry.day))
        : `${year}-02-29`

      plan.push({
        date: isoDate,
        month: monthIndex,
        day: entry.day,
        dayOfYear,
        ot: entry.ot,
        nt: entry.nt,
        label: entry.nt ? `${entry.ot} + ${entry.nt}` : entry.ot,
        leapOnly: !!entry.leapOnly,
      })
    })
  })

  return plan
}
