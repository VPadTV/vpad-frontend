import { isUserAuthenticated } from '@/utils/authUtils'
import Link from 'next/link'
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Footer() {
  const isAuthenticated = isUserAuthenticated();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-4">VPad</h3>
            <p className="text-subtext mb-4 max-w-md">
              Your creative hub for sharing and discovering amazing visual content. Join our community of artists and creators.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-subtext hover:text-primary">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-subtext hover:text-primary">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-subtext hover:text-primary">
                <FaLinkedin size={20} />
              </Link>
              <Link href="#" className="text-subtext hover:text-primary">
                <FaGithub size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {isAuthenticated ? (
                <li><Link href="/profile" className="text-subtext hover:text-primary">Profile</Link></li>
              ) : (
                <>
                  <li><Link href="/signin" className="text-subtext hover:text-primary">Log In</Link></li>
                  <li><Link href="/signup" className="text-subtext hover:text-primary">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
          
          {isAuthenticated && (
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Creator Tools</h4>
              <ul className="space-y-2">
                <li><Link href="/create" className="text-subtext hover:text-primary">Create Post</Link></li>
                <li><Link href="/series/manage" className="text-subtext hover:text-primary">Manage Series</Link></li>
                <li><Link href="/series/create" className="text-subtext hover:text-primary">Create Series</Link></li>
                <li><Link href="/tier/manage" className="text-subtext hover:text-primary">Subscription Tiers</Link></li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-subtext">
            © {new Date().getFullYear()} VPad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
