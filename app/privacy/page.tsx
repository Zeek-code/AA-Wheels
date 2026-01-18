export const metadata = {
  title: 'Privacy Policy - AA Wheel & Truck Supply',
  description: 'Privacy Policy for AA Wheel & Truck Supply',
}

export default function Privacy() {
  return (
    <div className="bg-white">
      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-6">
              AA Wheel & Truck Supply ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect information that you provide directly to us, including your name, email address, 
              phone number, and any other information you choose to provide when contacting us or using our services.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to respond to your inquiries, provide customer service, 
              and improve our services.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us through our contact page.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

