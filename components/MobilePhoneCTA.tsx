'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import websiteData from '@/website_data.json'

export default function MobilePhoneCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const contact = websiteData.contact
  const primaryPhone = contact.phone[0] || contact.locations[0]?.phone || '800-688-2953'

  // Hide on contact page and check if mobile
  const shouldShow = pathname !== '/contact'

  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth < 768 && shouldShow)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', () => {
      // Show after scrolling down a bit
      if (window.scrollY > 300) {
        checkMobile()
      } else {
        setIsVisible(false)
      }
    })

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [shouldShow])

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden transform transition-transform duration-300 ease-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)'
      }}
    >
      <div className="bg-primary-600 text-white shadow-lg">
        <a
          href={`tel:${primaryPhone.replace(/\D/g, '')}`}
          className="flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-primary-100">Call Now</div>
              <div className="font-semibold text-lg">{primaryPhone}</div>
            </div>
          </div>
          <div className="bg-white text-primary-600 rounded-full p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  )
}

