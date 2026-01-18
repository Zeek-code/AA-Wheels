'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}

export default function ScrollAnimation({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(20px)'
      case 'down':
        return 'translateY(-20px)'
      case 'left':
        return 'translateX(20px)'
      case 'right':
        return 'translateX(-20px)'
      default:
        return 'none'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getTransform(),
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {children}
    </div>
  )
}

