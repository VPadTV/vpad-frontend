'use client'

import { Card, CardBody } from '@nextui-org/react';
import VideoPlayer from '@/components/posts/VideoPlayer';

interface PostMediaProps {
  mediaUrl: string;
  mediaType: string;
  title: string;
}

export default function PostMedia({ mediaUrl, mediaType, title }: PostMediaProps) {
  return (
    <Card className="w-full mb-6 overflow-hidden">
      <CardBody className="p-0">
        {mediaType === 'VIDEO' ? (
          <VideoPlayer url={mediaUrl} />
        ) : (
          <img 
            src={mediaUrl} 
            alt={title} 
            className="w-full max-h-[80vh] object-contain"
          />
        )}
      </CardBody>
    </Card>
  );
}
