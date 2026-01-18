'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuote } from '@/contexts/QuoteContext'
import QuickViewModal from './QuickViewModal'

interface ProductCardProps {
  name: string
  description: string
  image: string
  category: string
}

export default function ProductCard({ name, description, image, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const { addToQuote, isInQuote } = useQuote()
  const imageUrl = image && image.startsWith('http') ? image : '/placeholder-product.svg'
  const inQuote = isInQuote(name)
  
  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToQuote({ name, category, description })
  }

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Zoom Effect */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            unoptimized
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {category}
            </span>
          </div>

          {/* Availability Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              In Stock
            </span>
          </div>

          {/* Hover Overlay with Actions */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => setShowQuickView(true)}
              className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              Quick View
            </button>
            <button
              onClick={handleAddToQuote}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                inQuote
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {inQuote ? '✓ In Quote' : 'Add to Quote'}
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
          <div className="flex items-center justify-between">
            <Link
              href={`/products#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Learn More
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            {inQuote && (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                In Quote
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          name={name}
          description={description}
          category={category}
          image={imageUrl}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  )
}
