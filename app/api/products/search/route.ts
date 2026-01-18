import { NextRequest, NextResponse } from 'next/server'
import websiteData from '@/website_data.json'

// Backend API placeholder for product search
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'

  let products = websiteData.content.products

  // Filter by category
  if (category !== 'all') {
    products = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Search by query
  if (query) {
    const searchTerm = query.toLowerCase()
    products = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    )
  }

  return NextResponse.json({
    products,
    count: products.length,
    total: websiteData.content.products.length
  })
}

