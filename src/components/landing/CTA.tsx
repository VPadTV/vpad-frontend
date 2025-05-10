import { Button } from '../ui/Button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function CTA() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  return (
    <div className="py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          {isAuthenticated 
            ? "Ready to Showcase Your Work?" 
            : "Ready to Start Your Creative Journey?"}
        </h2>
        <p className="text-lg text-subtext max-w-2xl mx-auto mb-8">
          {isAuthenticated
            ? "Share your creative work with our supportive community of artists and creators!"
            : "Join thousands of creators who've already made VPad their creative home. Start sharing your work today!"}
        </p>
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <Link href="/create">
              <Button className="bg-primary hover:bg-secondary text-white px-8 py-3 text-lg">
                Post Now 
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button className="bg-primary hover:bg-secondary text-white px-8 py-3 text-lg">
                Create Your Account
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
