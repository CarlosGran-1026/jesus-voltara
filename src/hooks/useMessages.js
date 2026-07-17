import { useCallback, useEffect, useState } from 'react'
import { seedMessages } from '@/data/messages'
import { slugify } from '@/utils/slug'

const STORAGE_KEY = 'palavraviva_messages'

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedMessages))
      return seedMessages
    }
    return JSON.parse(raw)
  } catch {
    return seedMessages
  }
}

function persist(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
}

// Módulo em memória + evento custom para sincronizar múltiplos componentes na mesma aba
let listeners = []
function notify(messages) {
  listeners.forEach((l) => l(messages))
}

export function useMessages() {
  const [messages, setMessages] = useState(loadMessages)

  useEffect(() => {
    listeners.push(setMessages)
    return () => {
      listeners = listeners.filter((l) => l !== setMessages)
    }
  }, [])

  const addMessage = useCallback((data) => {
    const newMessage = {
      id: `m_${Date.now()}`,
      slug: slugify(data.title) || `mensagem-${Date.now()}`,
      views: 0,
      ...data,
    }
    const updated = [newMessage, ...loadMessages().filter((m) => m.id !== newMessage.id)]
    persist(updated)
    notify(updated)
    return newMessage
  }, [])

  const updateMessage = useCallback((id, data) => {
    const current = loadMessages()
    const updated = current.map((m) =>
      m.id === id ? { ...m, ...data, slug: data.title ? slugify(data.title) : m.slug } : m
    )
    persist(updated)
    notify(updated)
  }, [])

  const deleteMessage = useCallback((id) => {
    const updated = loadMessages().filter((m) => m.id !== id)
    persist(updated)
    notify(updated)
  }, [])

  const incrementViews = useCallback((id) => {
    const current = loadMessages()
    const updated = current.map((m) => (m.id === id ? { ...m, views: (m.views || 0) + 1 } : m))
    persist(updated)
    notify(updated)
  }, [])

  const getBySlug = useCallback(
    (slug) => messages.find((m) => m.slug === slug),
    [messages]
  )

  const resetToSeed = useCallback(() => {
    persist(seedMessages)
    notify(seedMessages)
  }, [])

  const sorted = [...messages].sort((a, b) => new Date(b.date) - new Date(a.date))

  return {
    messages: sorted,
    addMessage,
    updateMessage,
    deleteMessage,
    incrementViews,
    getBySlug,
    resetToSeed,
  }
}
