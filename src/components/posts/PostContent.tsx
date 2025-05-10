'use client'

import { Card, CardBody, Avatar } from '@nextui-org/react';
import { Post } from '@/types/post';

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div>
      {post.text && (
        <Card className="mb-6">
          <CardBody>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-wrap">{post.text}</p>
          </CardBody>
        </Card>
      )}
      
      {post.credits.length > 0 && (
        <Card className="mb-6">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Credits</h2>
            <div className="space-y-3">
              {post.credits.map((credit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar src={credit.user.profilePhotoUrl || '/avatar.png'} size="sm" />
                  <div>
                    <div className="font-medium">{credit.user.nickname}</div>
                    <div className="text-sm text-gray-500">{credit.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
