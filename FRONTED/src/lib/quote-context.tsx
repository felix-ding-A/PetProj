'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface QuoteItem {
  id: string
  form: string
  productSlug: string
  label: string
  moqTier: string
}

interface QuoteContextValue {
  items: QuoteItem[]
  isDrawerOpen: boolean
  toastMessage: string | null
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (item: Omit<QuoteItem, 'id'>) => void
  removeItem: (id: string) => void
  clearItems: () => void
  showToast: (msg: string) => void
}

const STORAGE_KEY = 'pet-quote-box'

const QuoteContext = createContext<QuoteContextValue | null>(null)

export function QuoteBoxProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      // Ignore storage errors
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage quota errors
    }
  }, [items, hydrated])

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr))
    }, 3200)
  }, [])

  const addItem = useCallback(
    (incoming: Omit<QuoteItem, 'id'>) => {
      const id = `${incoming.form}:${incoming.productSlug}`
      setItems((prev) => {
        if (prev.some((p) => p.id === id)) return prev
        return [...prev, { ...incoming, id }]
      })
      showToast(`Added "${incoming.label}" to Quote Box`)
    },
    [showToast]
  )

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const clearItems = useCallback(() => {
    setItems([])
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
  }, [])

  return (
    <QuoteContext.Provider
      value={{
        items,
        isDrawerOpen,
        toastMessage,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        removeItem,
        clearItems,
        showToast,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuoteBox() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuoteBox must be used inside QuoteBoxProvider')
  return ctx
}

