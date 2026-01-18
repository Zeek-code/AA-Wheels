'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useQuote } from '@/contexts/QuoteContext'
import websiteData from '@/website_data.json'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [opacity, setOpacity] = useState(0.7)
  const [headerTop, setHeaderTop] = useState('0px')
  const pathname = usePathname()
  const navItems = websiteData.navigation.main
  const isHomePage = pathname === '/'
  const { quoteItems } = useQuote()

  useEffect(() => {
    if (!isHomePage) {
      // On other pages, always show solid header
      setIsScrolled(true)
      setOpacity(1)
      setHeaderTop('0px')
      return
    }

    // Calculate initial header position based on hero height
    const calculateInitialPosition = () => {
      const heroElement = document.getElementById('hero-section')
      if (heroElement) {
        const heroHeight = heroElement.offsetHeight
        const fivePercentOfHero = heroHeight * 0.05
        setHeaderTop(`${fivePercentOfHero}px`)
      }
    }

    // Initial calculation
    calculateInitialPosition()
    
    // Recalculate on resize
    window.addEventListener('resize', calculateInitialPosition, { passive: true })

    const handleScroll = () => {
      // Get hero section element
      const heroElement = document.getElementById('hero-section')
      if (!heroElement) {
        setIsScrolled(true)
        setOpacity(1)
        setHeaderTop('0px')
        return
      }

      const heroRect = heroElement.getBoundingClientRect()
      const heroHeight = heroElement.offsetHeight
      
      // Calculate 5% of hero height
      const fivePercentOfHero = heroHeight * 0.05
      
      // Initial position threshold: when hero top is at fivePercentOfHero from viewport top
      const initialHeroTop = fivePercentOfHero
      const heroTopFromViewport = heroRect.top
      const currentScrollY = window.scrollY

      if (currentScrollY === 0) {
        // At top of page - initial state with 5% hero visible, 70% opacity
        setIsScrolled(false)
        setOpacity(0.7)
        setHeaderTop(`${fivePercentOfHero}px`)
      } else if (heroTopFromViewport > initialHeroTop) {
        // Still above initial threshold - maintain initial state
        setIsScrolled(false)
        setOpacity(0.7)
        setHeaderTop(`${fivePercentOfHero}px`)
      } else if (heroTopFromViewport <= initialHeroTop && heroTopFromViewport > 0) {
        // Transitioning: hero is moving up, nav should snap to top and increase opacity
        setIsScrolled(false) // Still absolute but moving to top
        // Calculate header position: moves from fivePercentOfHero to 0
        const scrollRange = initialHeroTop
        const scrollProgress = (initialHeroTop - heroTopFromViewport) / scrollRange
        const newTop = fivePercentOfHero - (scrollProgress * fivePercentOfHero)
        setHeaderTop(`${Math.max(0, newTop)}px`)
        
        // Calculate opacity: starts at 0.7 when heroTop = initialHeroTop, goes to 1 when heroTop = 0
        const calculatedOpacity = Math.min(0.7 + (scrollProgress * 0.3), 1)
        setOpacity(calculatedOpacity)
      } else if (heroTopFromViewport <= 0) {
        // Hero has completely passed - nav is fixed and solid
        setIsScrolled(true)
        setOpacity(1)
        setHeaderTop('0px')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateInitialPosition)
    }
  }, [isHomePage])

  return (
    <header 
      className={`z-50 transition-all duration-300 ${
        isScrolled 
          ? 'fixed top-0 left-0 right-0 bg-white shadow-md' 
          : isHomePage
          ? 'absolute left-0 right-0'
          : 'sticky top-0 bg-white shadow-md'
      }`}
      style={{
        top: isScrolled ? '0px' : headerTop,
        backgroundColor: isScrolled || !isHomePage
          ? 'rgba(255, 255, 255, 1)' 
          : `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: !isScrolled && isHomePage ? 'blur(4px)' : 'none',
        boxShadow: isScrolled || opacity > 0.5 ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">
              AA Wheel
            </div>
            <span className="text-sm text-gray-600 hidden sm:inline">& Truck Supply</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {item.text}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600"></span>
                  )}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="btn-primary text-sm relative"
            >
              Get Quote
              {quoteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {quoteItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block font-medium py-2 transition-colors ${
                      isActive
                        ? 'text-primary-600 border-l-4 border-primary-600 pl-3 -ml-4'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                className="btn-primary text-sm block text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

