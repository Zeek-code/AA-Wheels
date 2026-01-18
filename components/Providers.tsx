'use client'

import { QuoteProvider } from '@/contexts/QuoteContext'
import MobilePhoneCTA from '@/components/MobilePhoneCTA'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QuoteProvider>
      {children}
      <MobilePhoneCTA />
    </QuoteProvider>
  )
}

