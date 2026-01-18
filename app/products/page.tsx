'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import ProductSearch from '@/components/ProductSearch'
import ScrollAnimation from '@/components/ScrollAnimation'
import Link from 'next/link'
import websiteData from '@/website_data.json'

export default function Products() {
  const allProducts = websiteData.content.products
  const categories = Array.from(new Set(allProducts.map(p => p.category)))
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let filtered = allProducts

      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      }

      setFilteredProducts(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery, allProducts])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Products Built to Perform
          </h1>
          <p className="text-xl text-primary-100">
            High-quality truck and trailer parts for all your needs
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <ProductSearch
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            categories={categories}
            productCount={filteredProducts.length}
            totalProducts={allProducts.length}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Searching products...</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ScrollAnimation key={index} direction="up" delay={index * 50}>
                      <ProductCard
                        name={product.name}
                        description={product.description}
                        image={product.image}
                        category={product.category}
                      />
                    </ScrollAnimation>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">No products found</h3>
                  <p className="mt-2 text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="mt-4 btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Finding the Right Part?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Our knowledgeable team is here to help you find exactly what you need.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Contact Our Experts
            </Link>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
