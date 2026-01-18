export const metadata = {
  title: 'Terms & Conditions - AA Wheel & Truck Supply',
  description: 'Terms and Conditions for AA Wheel & Truck Supply',
}

export default function Terms() {
  return (
    <div className="bg-white">
      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms & Conditions</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-6">
              Please read these Terms and Conditions carefully before using the AA Wheel & Truck Supply website.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using our website, you agree to be bound by these Terms and Conditions.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Use of Website</h2>
            <p className="text-gray-600 mb-4">
              You may use our website for lawful purposes only. You agree not to use the website in any way 
              that violates any applicable laws or regulations.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about these Terms and Conditions, please contact us through our contact page.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

