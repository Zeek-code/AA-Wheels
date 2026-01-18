'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useQuote } from '@/contexts/QuoteContext'

interface QuickViewModalProps {
  name: string
  description: string
  category: string
  image: string
  onClose: () => void
}

export default function QuickViewModal({
  name,
  description,
  category,
  image,
  onClose
}: QuickViewModalProps) {
  const { addToQuote, isInQuote } = useQuote()
  const inQuote = isInQuote(name)

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleAddToQuote = () => {
    addToQuote({ name, category, description })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-gray-200">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
              unoptimized
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                {category}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{name}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">In Stock - Ready to Ship</span>
              </div>
              
              <button
                onClick={handleAddToQuote}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  inQuote
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {inQuote ? '✓ Added to Quote' : 'Add to Quote'}
              </button>
              
              <a
                href="/contact"
                className="block w-full py-3 px-6 rounded-lg font-semibold text-center border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
              >
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

