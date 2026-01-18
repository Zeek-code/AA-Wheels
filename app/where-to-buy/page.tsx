import websiteData from '@/website_data.json'
import Link from 'next/link'

export const metadata = {
  title: 'Where to Buy - AA Wheel & Truck Supply',
  description: 'Find AA Wheel & Truck Supply locations in Omaha, Springfield, and North Kansas City.',
}

export default function WhereToBuy() {
  const locations = websiteData.contact.locations

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Where to Buy
          </h1>
          <p className="text-xl text-primary-100">
            Visit one of our locations or contact us for delivery
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  {location.city}
                </h2>
                <a
                  href={`tel:${location.phone.replace(/\D/g, '')}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold text-xl mb-4 block"
                >
                  {location.phone}
                </a>
                <p className="text-gray-600 mb-4">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM
                </p>
                <Link href="/contact" className="btn-primary text-sm">
                  Get Directions
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Visit in Person?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            We offer fast delivery to your doorstep. Contact us for shipping options.
          </p>
          <Link href="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

