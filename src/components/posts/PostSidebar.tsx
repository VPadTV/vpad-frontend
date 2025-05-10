'use client'

import { useRouter } from 'next/navigation';
import { Card, CardBody, Button, Chip, Divider } from '@nextui-org/react';
import { FaHeart, FaHeartBroken, FaEye, FaTag, FaDollarSign } from 'react-icons/fa';
import { Post } from '@/types/post';

interface PostSidebarProps {
  post: Post;
}

export default function PostSidebar({ post }: PostSidebarProps) {
  const router = useRouter();
  
  return (
    <div>
      {/* Stats Card */}
      <Card className="mb-6">
        <CardBody>
          <h2 className="text-lg font-semibold mb-3">Stats</h2>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <FaEye />
              <span>Views</span>
            </div>
            <span className="font-medium">{post.views}</span>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-500" />
              <span>Likes</span>
            </div>
            <span className="font-medium">{post.likes}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <FaHeartBroken className="text-gray-500" />
              <span>Dislikes</span>
            </div>
            <span className="font-medium">{post.dislikes}</span>
          </div>
          
          <Divider className="my-4" />
          
          <div className="flex gap-2 justify-center">
            <Button
              color={post.myVote === 1 ? "danger" : "default"}
              variant={post.myVote === 1 ? "solid" : "bordered"}
              startContent={<FaHeart />}
            >
              Like
            </Button>
            <Button
              color={post.myVote === -1 ? "default" : "default"}
              variant={post.myVote === -1 ? "solid" : "bordered"}
              startContent={<FaHeartBroken />}
            >
              Dislike
            </Button>
          </div>
        </CardBody>
      </Card>
      
      {/* Tags Card */}
      {post.tags.length > 0 && (
        <Card className="mb-6">
          <CardBody>
            <div className="flex items-center gap-2 mb-3">
              <FaTag />
              <h2 className="text-lg font-semibold">Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Chip key={tag} variant="flat">#{tag}</Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
      
      {/* Series Card */}
      {post.series && (
        <Card className="mb-6">
          <CardBody>
            <h2 className="text-lg font-semibold mb-3">Series</h2>
            <Button
              variant="flat"
              color="secondary"
              className="w-full"
              onClick={() => router.push(`/posts?seriesId=${post.series!.id}`)}
            >
              {post.series.name}
            </Button>
          </CardBody>
        </Card>
      )}
      
      {/* Tier Card */}
      {post.minTier && (
        <Card>
          <CardBody>
            <div className="flex items-center gap-2 mb-3">
              <FaDollarSign />
              <h2 className="text-lg font-semibold">Minimum Tier</h2>
            </div>
            <Chip color="success">
              {post.minTier.name}: ${post.minTier.price}
            </Chip>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
