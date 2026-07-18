import { useMemo, useState } from 'react'
import { generateReadingPlan } from '@/utils/readingPlan'
import { useReadingProgress } from '@/hooks/useReadingProgress'

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export default function ReadingPlan() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)

  const plan = useMemo(() => generateReadingPlan(year), [year])
  const { isChecked, toggleDay, checkedCount } = useReadingProgress(year)

  const months = useMemo(() => {
    const grouped = Array.from({ length: 12 }, () => [])
    plan.forEach((entry) => {
      grouped[entry.month].push(entry)
    })
    return grouped
  }, [plan])

  const todayStr = new Date().toISOString().slice(0, 10)
  const todayEntry = year === currentYear ? plan.find((p) => p.date === todayStr) : null
  const progressPct = plan.length ? Math.round((checkedCount / plan.length) * 100) : 0

  return (
    <div className="container page-section">
      <span className="eyebrow">Plano anual</span>
      <h1>Calendário de Leitura Bíblica</h1>
      <p style={{ maxWidth: 640 }}>
        Um plano para ler a Bíblia inteira em {plan.length} dias, de janeiro a dezembro, seguindo a ordem
        canônica — poucos capítulos por dia, no seu ritmo. Marque os dias conforme for lendo para acompanhar seu progresso.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', margin: 'var(--sp-3) 0 var(--sp-4)', flexWrap: 'wrap' }}>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          aria-label="Selecionar ano"
          style={{
            padding: '0.7em 1em',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
          }}
        >
          {[currentYear - 1, currentYear, currentYear + 1].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <div style={{ flex: '1 1 220px', minWidth: 200 }}>
          <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'var(--accent)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '0.4em 0 0' }}>
            {checkedCount} de {plan.length} dias concluídos ({progressPct}%)
          </p>
        </div>
      </div>

      {todayEntry && (
        <div className="card fade-in" style={{ padding: 'var(--sp-3)', marginBottom: 'var(--sp-4)', borderLeft: '4px solid var(--accent-gold)' }}>
          <span className="eyebrow">Leitura de hoje</span>
          <h3 style={{ margin: '0.2em 0' }}>{todayEntry.label}</h3>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em', fontSize: 'var(--fs-sm)', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={isChecked(todayEntry.dayOfYear)} onChange={() => toggleDay(todayEntry.dayOfYear)} />
            Marcar como lida
          </label>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7em' }}>
        {months.map((entries, i) => {
          const monthChecked = entries.filter((e) => isChecked(e.dayOfYear)).length
          const isCurrentMonth = year === currentYear && i === new Date().getMonth()

          return (
            <details key={i} open={isCurrentMonth} className="card" style={{ padding: 'var(--sp-2) var(--sp-3)' }}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-md)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5em 0',
                  listStyle: 'none',
                }}
              >
                <span>{monthNames[i]}</span>
                <span className="badge">{monthChecked}/{entries.length}</span>
              </summary>

              <div style={{ marginTop: '0.5em', display: 'flex', flexDirection: 'column', gap: '0.2em' }}>
                {entries.map((entry) => (
                  <label
                    key={entry.dayOfYear}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8em',
                      padding: '0.5em 0.6em',
                      borderRadius: 'var(--radius-sm)',
                      background: entry.date === todayStr ? 'var(--accent-bg)' : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <input type="checkbox" checked={isChecked(entry.dayOfYear)} onChange={() => toggleDay(entry.dayOfYear)} />
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', minWidth: 30 }}>
                      {String(entry.day).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--fs-sm)',
                        color: isChecked(entry.dayOfYear) ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: isChecked(entry.dayOfYear) ? 'line-through' : 'none',
                        flex: 1,
                        display: 'flex',
                        gap: '0.6em',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span>{entry.ot}</span>
                      {entry.nt && (
                        <>
                          <span style={{ color: 'var(--accent-gold)' }}>+</span>
                          <span>{entry.nt}</span>
                        </>
                      )}
                      {entry.leapOnly && (
                        <span className="badge" style={{ fontSize: '0.7rem', padding: '0.15em 0.6em' }}>
                          leitura bônus
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}
