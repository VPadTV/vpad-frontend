import { FaImage, FaUsers, FaComments, FaShieldAlt } from 'react-icons/fa'

export default function Features() {
  const features = [
    {
      icon: <FaImage className="w-8 h-8" />,
      title: "High-Quality Sharing",
      description: "Share your artwork in pristine quality with our optimized image hosting"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Vibrant Community",
      description: "Connect with fellow artists and creators from around the world"
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: "Meaningful Interactions",
      description: "Engage in discussions and receive valuable feedback on your work"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Your content is protected with our advanced security measures"
    }
  ]

  return (
    <div className="bg-cardBackground py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose VPad?</h2>
          <p className="text-subtext max-w-2xl mx-auto">
            Experience the best platform for visual content sharing and creative collaboration
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-background border border-border hover:border-primary transition-colors">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-subtext">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
