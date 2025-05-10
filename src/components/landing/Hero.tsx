import { Button } from '../ui/Button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Hero() {
  // Get authentication status and user info from Redux store
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-cardBackground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="animate-fade-in-down">
          {isAuthenticated ? (
            <>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-primary mb-6">
                Welcome Back{user?.nickname ? `, ${user.nickname}` : ''}!
              </h1>
              <p className="text-lg md:text-xl text-subtext max-w-2xl mx-auto mb-8">
                Ready to continue your creative journey? Share your work, connect with fellow artists, or explore new content.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-primary mb-6">
                Share Your Visual Stories
              </h1>
              <p className="text-lg md:text-xl text-subtext max-w-2xl mx-auto mb-8">
                Join our creative community where artists and creators share their work, get inspired, and connect with others.
              </p>
            </>
          )}
          <div className="flex gap-4 justify-center mb-12">
            {isAuthenticated ? (
              <>
                <Link href="/posts">
                  <Button variant='primary' className="bg-primary hover:bg-secondary text-white px-8 py-3 text-lg">
                    My Posts
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" className="px-8 py-3 text-lg">
                    Explore
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <Button variant='primary' className="bg-primary hover:bg-secondary text-white px-8 py-3 text-lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/browse">
                  <Button variant="outline" className="px-8 py-3 text-lg">
                    Explore
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="p-6 rounded-xl bg-cardBackground/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-primary mb-2">10K+</h3>
              <p className="text-subtext">Active Artists</p>
            </div>
            <div className="p-6 rounded-xl bg-cardBackground/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-primary mb-2">50K+</h3>
              <p className="text-subtext">Artworks Shared</p>
            </div>
            <div className="p-6 rounded-xl bg-cardBackground/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-primary mb-2">100+</h3>
              <p className="text-subtext">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
