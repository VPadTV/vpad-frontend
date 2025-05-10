'use client'

import { useState, useEffect } from 'react'
import PostFilter from '@/components/join/PostFilter'
import PostList from '@/components/join/PostList'
import { useAppDispatch } from '@/redux/hooks'
import { setPage } from '@/redux/features/postSlice'

export default function JoinPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [nsfw, setNsfw] = useState(false)
  const [tags, setTags] = useState('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPage(1))
  }, [searchTerm, sortBy, nsfw, tags, dispatch])

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
  }

  const handleNsfwChange = (showNsfw: boolean) => {
    setNsfw(showNsfw)
  }

  const handleTagsChange = (newTags: string) => {
    setTags(newTags)
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="flex flex-col">
        <PostFilter 
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onNsfwChange={handleNsfwChange}
          onTagsChange={handleTagsChange}
        />
        <div className="px-4 md:px-10 pt-6 pb-20">
          <h1 className="text-3xl font-bold mb-8">Community Posts</h1>
          <PostList 
            searchTerm={searchTerm}
            sortBy={sortBy}
            nsfw={nsfw}
            tags={tags}
          />
        </div>
      </div>
    </main>
  )
}