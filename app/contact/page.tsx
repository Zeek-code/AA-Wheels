'use client'

import { useState } from 'react'
import websiteData from '@/website_data.json'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({
    interest: 'purchasing',
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const contact = websiteData.contact

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to a server
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom pt-32 pb-20 px-4 sm:px-6 lg:px-8 md:pt-40 md:pb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-primary-100">
            Have Questions Or Need Pricing? Our Team Is Here To Help
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Send Us a Message
              </h2>
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Thank you! Your message has been sent. We'll respond within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                    I'm interested in:
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="purchasing">Purchasing</option>
                    <option value="quotes">Quotes</option>
                    <option value="vendor">Becoming a Vendor</option>
                    <option value="accounting">Accounting Dept</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send My Query
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Get In Touch
              </h2>
              <p className="text-gray-600 mb-8">
                We'll help you find the right part - Fast and hassle-free
              </p>

              <div className="space-y-6">
                {contact.locations.map((location, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {location.city}
                    </h3>
                    <a
                      href={`tel:${location.phone.replace(/\D/g, '')}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-lg"
                    >
                      {location.phone}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

