import { useCallback, useEffect, useState } from 'react'

export function useReadingProgress(year) {
  const storageKey = `palavraviva_reading_progress_${year}`

  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}')
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      setChecked(JSON.parse(localStorage.getItem(storageKey) || '{}'))
    } catch {
      setChecked({})
    }
  }, [storageKey])

  const toggleDay = useCallback(
    (dayOfYear) => {
      setChecked((prev) => {
        const updated = { ...prev, [dayOfYear]: !prev[dayOfYear] }
        localStorage.setItem(storageKey, JSON.stringify(updated))
        return updated
      })
    },
    [storageKey]
  )

  const isChecked = useCallback((dayOfYear) => !!checked[dayOfYear], [checked])
  const checkedCount = Object.values(checked).filter(Boolean).length

  return { isChecked, toggleDay, checkedCount }
}
