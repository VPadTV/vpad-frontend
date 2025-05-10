import { FaQuoteLeft } from 'react-icons/fa'

export default function Testimonials() {
  const testimonials = [
    {
      quote: "VPad has transformed how I share my artwork. The community here is incredibly supportive!",
      author: "Sarah Chen",
      role: "Digital Artist",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      quote: "The image quality and organization features are exactly what I needed for my photography portfolio.",
      author: "Marcus Rodriguez",
      role: "Photographer",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      quote: "Finally found a platform that truly understands what creators need. Amazing experience!",
      author: "Emily Parker",
      role: "Illustrator",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ]

  return (
    <div className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
          <p className="text-subtext max-w-2xl mx-auto">
            Join thousands of satisfied creators who've found their home on VPad
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative p-8 rounded-xl bg-cardBackground border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
              <FaQuoteLeft className="text-primary/20 text-4xl absolute top-4 left-4" />
              <div className="flex flex-col items-center text-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full mb-4 border-2 border-primary"
                />
                <p className="text-foreground mb-4 italic">{testimonial.quote}</p>
                <h4 className="font-semibold text-primary">{testimonial.author}</h4>
                <p className="text-sm text-subtext">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
