import Hero from '@/components/Hero'
import FeatureCard from '@/components/FeatureCard'
import ProductCard from '@/components/ProductCard'
import TestimonialCard from '@/components/TestimonialCard'
import ScrollAnimation from '@/components/ScrollAnimation'
import Link from 'next/link'
import websiteData from '@/website_data.json'

export default function Home() {
  const features = websiteData.content.features
  const products = websiteData.content.products.slice(0, 6) // Show first 6 on home
  const testimonials = websiteData.content.testimonials.slice(0, 3) // Show first 3 on home
  const about = websiteData.content.about

  return (
    <>
      <Hero />
      
      {/* About Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <ScrollAnimation direction="fade">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {about.heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {about.content}
              </p>
              <Link href="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollAnimation direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why AA Wheel & Supply Stands Above the Rest
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have been providing our value customers the most high-quality products. We equip your truck with the part that brings out the best performance and provides heavy duty coverage.
            </p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <FeatureCard
                  number={feature.number}
                  title={feature.title}
                  description={feature.description}
                />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <ScrollAnimation direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Products Built to Perform
            </p>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  category={product.category}
                />
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation direction="fade" className="text-center mt-12">
            <Link href="/products" className="btn-primary">
              View All Products
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollAnimation direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">EXCELLENT</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">Based on 37 reviews</p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 150}>
                <TestimonialCard
                  author={testimonial.author}
                  date={testimonial.date}
                  text={testimonial.text}
                />
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation direction="fade" className="text-center mt-12">
            <Link href="/testimonials" className="btn-secondary">
              Read All Testimonials
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Quote or Part Info?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Contact Our Experts! Our team usually responds within 24 hours.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Get In Touch
            </Link>
          </ScrollAnimation>
        </div>
      </section>
    </>
  )
}

