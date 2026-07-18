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
// O dia extra de 29/02 (leapOnly) só entra em anos bissextos.
export function generateReadingPlan(year) {
  const leap = isLeapYear(year)
  const plan = []
  let dayOfYear = 0

  dailyReadingPlan.forEach((month, monthIndex) => {
    month.days.forEach((entry) => {
      if (entry.leapOnly && !leap) return

      dayOfYear += 1
      const date = new Date(year, monthIndex, entry.day)

      plan.push({
        date: toISODate(date),
        dayOfYear,
        ot: entry.ot,
        nt: entry.nt,
        label: entry.nt ? `${entry.ot} + ${entry.nt}` : entry.ot,
      })
    })
  })

  return plan
}
