'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { FaFilter, FaTimes, FaSearch, FaSortAmountDown, FaChevronDown } from 'react-icons/fa'

interface FilterProps {
  tierId?: string;
  tierName?: string | null;
  loading?: boolean;
  onFilterChange?: (filters: {
    tags: string[];
    search: string;
    sortBy: string;
  }) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tagInput, setTagInput] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('latest')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    
    const timer = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          tags: selectedTags,
          search: searchTerm,
          sortBy: sortBy,
        });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedTags, searchTerm, sortBy, onFilterChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!selectedTags.includes(tagInput.trim())) {
        setSelectedTags([...selectedTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  const getSortDisplayText = () => {
    return sortBy.charAt(0).toUpperCase() + sortBy.slice(1).replace('-', ' ');
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-lg border-b border-border mt-[5rem]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-cardBackground border border-border focus:border-primary focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-subtext" />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative" ref={sortRef}>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <FaSortAmountDown />
                {getSortDisplayText()}
                <FaChevronDown className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isSortOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-cardBackground border border-border rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    <li 
                      className={`px-4 py-2 hover:bg-primary hover:text-white cursor-pointer ${sortBy === 'latest' ? 'bg-primary/10' : ''}`}
                      onClick={() => handleSortChange('latest')}
                    >
                      Latest
                    </li>
                    <li 
                      className={`px-4 py-2 hover:bg-primary hover:text-white cursor-pointer ${sortBy === 'oldest' ? 'bg-primary/10' : ''}`}
                      onClick={() => handleSortChange('oldest')}
                    >
                      Oldest
                    </li>
                    <li 
                      className={`px-4 py-2 hover:bg-primary hover:text-white cursor-pointer ${sortBy === 'high-views' ? 'bg-primary/10' : ''}`}
                      onClick={() => handleSortChange('high-views')}
                    >
                      Most Views
                    </li>
                    <li 
                      className={`px-4 py-2 hover:bg-primary hover:text-white cursor-pointer ${sortBy === 'low-views' ? 'bg-primary/10' : ''}`}
                      onClick={() => handleSortChange('low-views')}
                    >
                      Least Views
                    </li>
                  </ul>
                </div>
              )}
            </div>
      
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FaFilter className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              Filter
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="py-4 animate-in slide-in-from-top-4 duration-200">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Add tag and press Enter (e.g. Digital Art, Photography)"
                className="w-full p-2 rounded-lg bg-cardBackground border border-border focus:border-primary focus:outline-none"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag) => (
                  <div 
                    key={tag}
                    className="px-3 py-1 bg-primary text-white rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:bg-primary-dark rounded-full">
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
