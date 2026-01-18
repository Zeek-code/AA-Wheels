import Link from 'next/link'
import websiteData from '@/website_data.json'

export default function Hero() {
  const hero = websiteData.content.hero

  return (
    <section id="hero-section" className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              {hero.cta}
            </Link>
            <Link href="/products" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
              {hero.cta_secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

