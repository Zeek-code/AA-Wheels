'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  name: string
  category: string
  description: string
}

interface QuoteContextType {
  quoteItems: Product[]
  addToQuote: (product: Product) => void
  removeFromQuote: (productName: string) => void
  clearQuote: () => void
  isInQuote: (productName: string) => boolean
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteItems, setQuoteItems] = useState<Product[]>([])

  const addToQuote = (product: Product) => {
    setQuoteItems(prev => {
      // Check if already in quote
      if (prev.some(item => item.name === product.name)) {
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromQuote = (productName: string) => {
    setQuoteItems(prev => prev.filter(item => item.name !== productName))
  }

  const clearQuote = () => {
    setQuoteItems([])
  }

  const isInQuote = (productName: string) => {
    return quoteItems.some(item => item.name === productName)
  }

  return (
    <QuoteContext.Provider value={{
      quoteItems,
      addToQuote,
      removeFromQuote,
      clearQuote,
      isInQuote
    }}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}

