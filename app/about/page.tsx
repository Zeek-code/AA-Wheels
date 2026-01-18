import websiteData from '@/website_data.json'
import FeatureCard from '@/components/FeatureCard'
import Link from 'next/link'

export const metadata = {
  title: 'About Us - AA Wheel & Truck Supply',
  description: 'Learn about AA Wheel & Truck Supply, your trusted truck and trailer parts supplier serving the Midwest for over 25 years.',
}

export default function About() {
  const about = websiteData.content.about
  const features = websiteData.content.features

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About AA Wheel & Truck Supply
          </h1>
          <p className="text-xl text-primary-100">
            Your trusted partner for over 25 years
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {about.heading}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {about.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Stand Out */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why AA Wheel and Truck Stand Above the Rest
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We take pride in providing our valued customers the most durable and heavy-duty parts. Our focus is on quality, research and developing parts that don't leave you stranded on the side of the road.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                number={feature.number}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us today to learn more about our products and services.
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

