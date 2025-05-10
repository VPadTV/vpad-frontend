'use client'

import { useState, useEffect, useRef } from 'react';
import { streamPost } from '@/utils/api/postApi';

interface VideoPlayerProps {
  url: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({ url, autoPlay = false, controls = true, muted = false, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  useEffect(() => {
    if (!isBrowser) return;
    
    const isStreamRequired = url.includes('/file/');
    
    if (isStreamRequired) {
      const parts = url.split('/');
      const key = parts[parts.length - 1];
      
      if (key) {
        setIsStreaming(true);
        
        const fetchStreamUrl = async () => {
          try {
            const streamingUrl = await streamPost(key);
            setStreamUrl(streamingUrl);
          } catch (error) {
            console.error('Error streaming video:', error);
            setStreamUrl(url);
          }
        };
        fetchStreamUrl();
      }
    } else {
      setIsStreaming(false);
      setStreamUrl(url);
    }
  }, [url, isBrowser]);
  
  return (
    <div className={`w-full ${className}`}>
      {isBrowser && streamUrl && (
        <video 
          ref={videoRef}
          src={streamUrl}
          className="w-full max-h-[80vh]"
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          playsInline
        />
      )}
      {(!isBrowser || !streamUrl) && (
        <div className="flex justify-center items-center h-40 bg-gray-200 rounded">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
