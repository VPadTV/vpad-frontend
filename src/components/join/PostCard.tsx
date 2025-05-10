'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PostSummary } from '@/types/post'
import { FaEye, FaCalendarAlt, FaUser } from 'react-icons/fa'
import { formatDate } from '@/utils/date' 

interface PostCardProps {
  post: PostSummary
}

export default function PostCard({ post }: PostCardProps) {
  const {
    id,
    title,
    thumbUrl,
    meta
  } = post

  return (
    <Link href={`/posts/${id}`}>
      <div className="bg-cardBackground rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border h-full flex flex-col">
        <div className="relative w-full overflow-hidden" style={{ minHeight: "200px", height: "200px" }}>
          {thumbUrl ? (
            <Image
              src={thumbUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform hover:scale-105"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <span className="text-primary">No thumbnail</span>
            </div>
          )}
          
          {meta?.nsfw && (
            <div className="absolute top-2 right-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                NSFW
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{title}</h3>
          
          <div className="mt-auto space-y-2 text-sm text-subtext">
            <div className="flex items-center gap-2">
              <FaUser className="text-primary" />
              <span className="truncate">{meta?.author?.nickname}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaEye className="text-primary" />
              <span>{meta?.views || 0} views</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <span>{formatDate(meta?.createdAt)}</span>
            </div>
          </div>
          
          {meta?.tags && meta.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {meta.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
              {meta.tags.length > 3 && (
                <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded">
                  +{meta.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
