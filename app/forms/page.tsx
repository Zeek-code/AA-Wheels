import Link from 'next/link'

export const metadata = {
  title: 'Forms Library - AA Wheel & Truck Supply',
  description: 'Download forms and documents from AA Wheel & Truck Supply.',
}

export default function Forms() {
  const forms = [
    { name: 'Customer Application Form', description: 'Apply to become a customer', href: '#' },
    { name: 'Credit Application', description: 'Apply for credit terms', href: '#' },
    { name: 'Product Catalog', description: 'Download our complete product catalog', href: '#' },
    { name: 'Warranty Form', description: 'Submit a warranty claim', href: '#' },
    { name: 'Return Authorization', description: 'Request a return authorization', href: '#' },
    { name: 'Price List', description: 'Current pricing information', href: '#' },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Forms Library
          </h1>
          <p className="text-xl text-primary-100">
            Download forms and documents you need
          </p>
        </div>
      </section>

      {/* Forms Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-primary-600 transition-colors">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {form.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {form.description}
                </p>
                <Link
                  href={form.href}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Download →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Need Help with Forms?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is here to assist you with any questions about our forms.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

