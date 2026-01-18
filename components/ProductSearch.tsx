'use client'

import { useState, useEffect } from 'react'

interface ProductSearchProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  selectedCategory: string
  categories: string[]
  productCount: number
  totalProducts: number
}

export default function ProductSearch({
  onSearch,
  onCategoryChange,
  selectedCategory,
  categories,
  productCount,
  totalProducts
}: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery)
      setIsSearching(false)
    }, 300) // Debounce search

    return () => clearTimeout(timer)
  }, [searchQuery, onSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchQuery('')
    onSearch('')
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search products by name, category, or description..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-10 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{productCount}</span> of <span className="font-semibold">{totalProducts}</span> products
        {searchQuery && (
          <span> for &quot;{searchQuery}&quot;</span>
        )}
      </div>
    </div>
  )
}

