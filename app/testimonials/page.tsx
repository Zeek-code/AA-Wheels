import TestimonialCard from '@/components/TestimonialCard'
import websiteData from '@/website_data.json'
import Link from 'next/link'

export const metadata = {
  title: 'Testimonials - AA Wheel & Truck Supply',
  description: 'Read what our customers say about AA Wheel & Truck Supply.',
}

export default function Testimonials() {
  const testimonials = websiteData.content.testimonials

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Customer Testimonials
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">EXCELLENT</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-primary-100">Based on 37 reviews</p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                author={testimonial.author}
                date={testimonial.date}
                text={testimonial.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Satisfied Customers
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Experience the AA Wheel & Truck Supply difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link href="/products" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

