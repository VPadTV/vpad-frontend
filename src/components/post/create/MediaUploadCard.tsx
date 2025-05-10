'use client'

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Card } from '@nextui-org/react';
import { FaTimes, FaUpload } from 'react-icons/fa';
import { MediaType } from '@/types/post';
import toast from 'react-hot-toast';

interface MediaUploadCardProps {
  mediaFile: File | null;
  setMediaFile: (file: File | null) => void;
  thumbFile: File | null;
  setThumbFile: (file: File | null) => void;
  mediaPreview: string | null;
  setMediaPreview: (preview: string | null) => void;
  thumbPreview: string | null;
  setThumbPreview: (preview: string | null) => void;
  mediaType: MediaType | null;
  setMediaType: (type: MediaType | null) => void;
}

const MediaUploadCard: React.FC<MediaUploadCardProps> = ({
  mediaFile,
  setMediaFile,
  thumbFile,
  setThumbFile,
  mediaPreview,
  setMediaPreview,
  thumbPreview,
  setThumbPreview,
  mediaType,
  setMediaType,
}) => {
  
  const onDropMedia = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setMediaFile(file);
      setMediaType(file.type.startsWith('image/') ? 'IMAGE' : 'VIDEO');
      
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      
      if (file.type.startsWith('image/') && !thumbFile) {
        setThumbFile(file);
        setThumbPreview(url);
      }
    }
  }, [thumbFile, setMediaFile, setMediaType, setMediaPreview, setThumbFile, setThumbPreview]);

  const onDropThumb = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Thumbnail must be an image');
        return;
      }
      
      setThumbFile(file);
      setThumbPreview(URL.createObjectURL(file));
    }
  }, [setThumbFile, setThumbPreview]);

  const { getRootProps: getMediaRootProps, getInputProps: getMediaInputProps } = useDropzone({
    onDrop: onDropMedia,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxFiles: 1,
    multiple: false
  });

  const { getRootProps: getThumbRootProps, getInputProps: getThumbInputProps } = useDropzone({
    onDrop: onDropThumb,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Main Media</h2>
      
      {!mediaFile ? (
        <div
          {...getMediaRootProps()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-border hover:border-primary"
        >
          <input {...getMediaInputProps()} />
          <FaUpload className="mx-auto text-3xl mb-4 text-primary" />
          <p className="text-lg mb-2">Drag & drop your media here</p>
          <p className="text-sm text-subtext">Or click to select files</p>
          <p className="text-xs text-subtext mt-2">Supports: Images (PNG, JPG, GIF) and Videos (MP4, WebM)</p>
        </div>
      ) : (
        <div className="relative">
          {mediaType === 'IMAGE' ? (
            <img
              src={mediaPreview!}
              alt="Preview"
              className="w-full rounded-lg max-h-[400px] object-contain bg-black/50"
            />
          ) : (
            <video
              src={mediaPreview!}
              controls
              className="w-full rounded-lg max-h-[400px]"
            />
          )}
          <Button
            isIconOnly
            color="danger"
            variant="solid"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              setMediaFile(null);
              setMediaPreview(null);
              setMediaType(null);
            
              if (thumbFile === mediaFile) {
                setThumbFile(null);
                setThumbPreview(null);
              }
            }}
          >
            <FaTimes />
          </Button>
        </div>
      )}
      
      {mediaFile && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Thumbnail (Optional)</h3>
          <p className="text-sm text-subtext mb-3">
            {mediaType === 'VIDEO' ? 'Add a thumbnail image for your video' : 'You can use a different image as thumbnail'}
          </p>
          
          {!thumbFile ? (
            <div
              {...getThumbRootProps()}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors border-border hover:border-primary"
            >
              <input {...getThumbInputProps()} />
              <FaUpload className="mx-auto text-xl mb-2 text-primary" />
              <p className="text-sm">Upload thumbnail image</p>
            </div>
          ) : (
            <div className="relative w-40 h-40">
              <img
                src={thumbPreview!}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                isIconOnly
                color="danger"
                variant="solid"
                size="sm"
                className="absolute top-1 right-1"
                onClick={() => {
                  setThumbFile(null);
                  setThumbPreview(null);
                }}
              >
                <FaTimes />
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default MediaUploadCard;
