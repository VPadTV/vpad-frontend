'use client'

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { FaTimes, FaUpload, FaPlus, FaSave } from 'react-icons/fa';
import { Button, Input, Switch, Textarea, Chip, Select, SelectItem, Card } from '@nextui-org/react';
import { MediaType } from '@/types/post';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPost, updatePost, resetPostState } from '@/redux/features/postSlice';
import { PostUpdateRequest } from '@/utils/api/postApi';
import toast from 'react-hot-toast';

interface EditPostFormProps {
  postId: string;
}

export default function EditPostForm({ postId }: EditPostFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentPost, loading, success, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  
  const [text, setText] = useState('');
  const [nsfw, setNsfw] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [minTierId, setMinTierId] = useState<string>('');
  const [seriesId, setSeriesId] = useState<string>('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [isMediaChanged, setIsMediaChanged] = useState(false);
  const [isThumbChanged, setIsThumbChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const mockTiers = [
    { id: 'tier1', name: 'Free', price: 0 },
    { id: 'tier2', name: 'Basic', price: 5 },
    { id: 'tier3', name: 'Premium', price: 10 }
  ];
  
  const mockSeries = [
    { id: 'series1', name: 'Art Collection' },
    { id: 'series2', name: 'Photography' },
    { id: 'series3', name: 'Digital Works' }
  ];

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [postId, dispatch]);
  
  useEffect(() => {
    if (currentPost) {
      setText(currentPost.text || '');
      setNsfw(currentPost.nsfw ?? false);
      setTags(currentPost.tags);
      setMinTierId(currentPost.minTier?.id || '');
      setSeriesId(currentPost.series?.id || '');
      setMediaPreview(currentPost.mediaUrl);
      setThumbPreview(currentPost.thumbUrl || null);
      setMediaType(currentPost.mediaType);
      
      if (user?.id !== currentPost?.author?.id) {
        toast.error('You are not authorized to edit this post');
        router.push(`/posts/${postId}`);
      }
    }
  }, [currentPost, user, postId, router]);

  useEffect(() => {
    if (success && isUpdating) {
      toast.success('Post updated successfully!');
      router.push(`/posts/${postId}`);
      dispatch(resetPostState());
      setIsUpdating(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetPostState());
      setIsUpdating(false);
    }
  }, [success, error, isUpdating, postId, router, dispatch]);

  const onDropMedia = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setMediaFile(file);
      setMediaType(file.type.startsWith('image/') ? 'IMAGE' : 'VIDEO');
      setIsMediaChanged(true);
      
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      
      if (file.type.startsWith('image/') && !isThumbChanged) {
        setThumbFile(file);
        setThumbPreview(url);
        setIsThumbChanged(true);
      }
    }
  }, [isThumbChanged]);

  const onDropThumb = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Thumbnail must be an image');
        return;
      }
      
      setThumbFile(file);
      setThumbPreview(URL.createObjectURL(file));
      setIsThumbChanged(true);
    }
  }, []);

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

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!currentPost) {
      toast.error('Post not loaded');
      return;
    }

    setIsUpdating(true);
    
    const postData: PostUpdateRequest = {
      text,
      nsfw,
      tags: tags.join(','),
      minTierId: minTierId && minTierId.trim() !== '' ? minTierId : undefined,
      seriesId: seriesId && seriesId.trim() !== '' ? seriesId : undefined,
    };
    
    if (isMediaChanged && mediaFile) {
      postData.media = mediaFile;
    }
    
    if (isThumbChanged && thumbFile && thumbFile !== mediaFile) {
      postData.thumb = thumbFile;
    }

    dispatch(updatePost({ id: postId, postData }));
  };

  if (loading && !currentPost) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl text-gray-500">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        
        <div className="relative mb-4">
          {mediaType === 'IMAGE' ? (
            <img
              src={mediaPreview!}
              alt="Media Preview"
              className="w-full rounded-lg max-h-[400px] object-contain bg-black/50"
            />
          ) : (
            <video
              src={mediaPreview!}
              controls
              className="w-full rounded-lg max-h-[400px]"
            />
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Update Media (Optional)</h3>
          <div
            {...getMediaRootProps()}
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors border-border hover:border-primary"
          >
            <input {...getMediaInputProps()} />
            <FaUpload className="mx-auto text-xl mb-2 text-primary" />
            <p className="text-sm">Upload new media (will replace current)</p>
          </div>
        </div>
        
        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-2">Thumbnail</h3>
          
          {thumbPreview ? (
            <div className="flex items-start gap-4">
              <div className="relative w-40 h-40">
                <img
                  src={thumbPreview}
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-subtext mb-2">Update thumbnail (optional)</p>
                <div
                  {...getThumbRootProps()}
                  className="border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors border-border hover:border-primary"
                >
                  <input {...getThumbInputProps()} />
                  <FaUpload className="mx-auto text-sm mb-1 text-primary" />
                  <p className="text-xs">Upload new thumbnail</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              {...getThumbRootProps()}
              className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors border-border hover:border-primary"
            >
              <input {...getThumbInputProps()} />
              <FaUpload className="mx-auto text-xl mb-2 text-primary" />
              <p className="text-sm">Add a thumbnail image</p>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Post Details</h2>
        
        <div className="space-y-4">
          <Textarea
            label="Description"
            placeholder="Add some details about your post..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px]"
          />
          
          <div>
            <Input
              label="Tags (comma-separated)"
              placeholder="Add tags and press Enter"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <Chip
                    key={tag}
                    onClose={() => removeTag(tag)}
                    variant="flat"
                  >
                    #{tag}
                  </Chip>
                ))}
              </div>
            )}
          </div>
          
          <Select
            label="Minimum Tier"
            placeholder="Select required tier to view"
            value={minTierId}
            onChange={(e) => setMinTierId(e.target.value)}
            className="w-full"
          >
            <SelectItem key="none" value="" textValue="No minimum tier">
              No minimum tier
            </SelectItem>
            <>
              {mockTiers.map(tier => (
                <SelectItem 
                  key={tier.id} 
                  value={tier.id}
                  textValue={`${tier.name} ${tier.price} dollars`}
                >
                  {tier.name} (${tier.price})
                </SelectItem>
              ))}
            </>
          </Select>
          
          <Select
            label="Series (Optional)"
            placeholder="Select a series"
            value={seriesId}
            onChange={(e) => setSeriesId(e.target.value)}
            className="w-full"
          >
            <SelectItem key="none" value="" textValue="No series">
              No series
            </SelectItem>
            <>
              {mockSeries.map(series => (
                <SelectItem 
                  key={series.id} 
                  value={series.id}
                  textValue={series.name}
                >
                  {series.name}
                </SelectItem>
              ))}
            </>
          </Select>
          
          <div className="flex items-center gap-2">
            <Switch
              checked={nsfw}
              onChange={(e) => setNsfw(e.target.checked)}
            />
            <span>Mark as NSFW</span>
          </div>
        </div>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          color="primary"
          startContent={<FaSave />}
          onClick={handleSubmit}
          isLoading={isUpdating}
          className="flex-1"
        >
          Save Changes
        </Button>
        
        <Button
          color="default"
          variant="flat"
          onClick={() => router.push(`/posts/${postId}`)}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
