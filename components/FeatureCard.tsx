interface FeatureCardProps {
  number: string
  title: string
  description: string
}

export default function FeatureCard({ number, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-primary-600 text-4xl font-bold mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

