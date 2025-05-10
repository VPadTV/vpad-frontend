
import { cn } from '@nextui-org/react'
import Link from 'next/link'
import { FaHeart, FaComment } from 'react-icons/fa'

type Props = {
    id: string,
    imgSrc: string,
    title: string,
    user: string,
    date: string,
    containerClassName?: string
}

function PostCard({ id, imgSrc, title, user, date, containerClassName = '' }: Props) {
    return (
        <Link href={`/posts/${id}`} className={cn(
            'cursor-pointer transition-all duration-300 h-fit bg-cardBackground rounded-xl shadow-sm border border-border hover:border-primary/50 hover:shadow-md hover:scale-[1.02] block',
            containerClassName
        )}>
            <div className="overflow-hidden rounded-t-xl">
                <img
                    className='w-full aspect-[4/3] object-cover transition-transform hover:scale-105'
                    src={imgSrc}
                    alt={title}
                />
            </div>
            <div className='p-4'>
                <h3 className='text-lg font-semibold text-foreground line-clamp-2'>{title}</h3>
                <p className='text-sm text-primary font-medium mt-2'>{user}</p>
                <div className='flex items-center justify-between mt-3'>
                    <p className='text-xs text-subtext'>{date}</p>
                
                </div>
            </div>
        </Link>
    )
}

export default PostCard