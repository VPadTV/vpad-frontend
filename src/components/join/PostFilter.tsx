'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { FaFilter, FaSearch, FaEye, FaEyeSlash } from 'react-icons/fa'

interface PostFilterProps {
  onSearchChange: (search: string) => void
  onSortChange: (sortBy: string) => void
  onNsfwChange: (nsfw: boolean) => void
  onTagsChange: (tags: string) => void
}

export default function PostFilter({ 
  onSearchChange, 
  onSortChange, 
  onNsfwChange,
  onTagsChange
}: PostFilterProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [showNsfw, setShowNsfw] = useState(false)
  const [tags, setTags] = useState('')
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    
    searchTimeout.current = setTimeout(() => {
      onSearchChange(value)
    }, 500)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    onSearchChange(searchTerm)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    onSortChange(newSortBy)
  }

  const handleNsfwToggle = () => {
    const newValue = !showNsfw
    setShowNsfw(newValue)
    onNsfwChange(newValue)
  }

  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTags(value)
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
    
    searchTimeout.current = setTimeout(() => {
      onTagsChange(value)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
    }
  }, [])

  return (
    <div className="sticky top-[80px] w-full z-20 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchInput}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-cardBackground border border-border focus:border-primary focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext" />
          </div>
          
          <div className="flex gap-2">          
            <Button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FaFilter className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              {isOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </form>

        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
          <div className="flex flex-wrap gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Sort By</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === 'latest' ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange('latest')}
                >
                  Latest
                </Button>
                <Button
                  variant={sortBy === 'oldest' ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange('oldest')}
                >
                  Oldest
                </Button>
                <Button
                  variant={sortBy === 'high-views' ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange('high-views')}
                >
                  Most Views
                </Button>
                <Button
                  variant={sortBy === 'low-views' ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange('low-views')}
                >
                  Least Views
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">NSFW Content</h4>
              <Button
                variant={showNsfw ? "primary" : "outline"}
                size="sm"
                onClick={handleNsfwToggle}
                className="flex items-center gap-2"
              >
                {showNsfw ? <FaEye /> : <FaEyeSlash />}
                {showNsfw ? "Show NSFW" : "Hide NSFW"}
              </Button>
            </div>
            
            <div className="w-full md:w-auto">
              <h4 className="text-sm font-medium mb-2">Tags (comma separated)</h4>
              <input
                type="text"
                placeholder="e.g. art,animation,design"
                value={tags}
                onChange={handleTagsInput}
                className="w-full md:w-64 px-3 py-2 rounded-lg bg-cardBackground border border-border focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
