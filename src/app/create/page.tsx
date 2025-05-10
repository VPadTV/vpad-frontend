'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@nextui-org/react';
import { MediaType } from '@/types/post';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createPost, resetPostState } from '@/redux/features/postSlice';
import { getTiers } from '@/redux/features/tierSlice';
import { getSeries } from '@/redux/features/seriesSlice';
import { PostCreateRequest } from '@/utils/api/postApi';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { 
  MediaUploadCard, 
  PostDetailsForm, 
  CreditsSection,
  Credit
} from '@/components/post/create';

interface PostFormValues {
  title: string;
  text: string;
  nsfw: boolean;
  tags: string[];
  minTierId: string;
  seriesId: string;
  credits: Credit[];
}
const postSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  text: yup.string().required('Description is required'),
  nsfw: yup.boolean().defined(),
  tags: yup.array().of(yup.string().defined()).min(1, 'At least one tag is required').defined(),
  minTierId: yup.string().defined(),
  seriesId: yup.string().defined(),
  credits: yup.array()
    .of(
      yup.object().shape({
        userId: yup.string().defined(),
        description: yup.string().defined()
      })
    )
    .defined()
});

export default function CreatePost() {
  const { open } = useSidebarContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.posts);
  const { tiers, loading: tiersLoading } = useAppSelector((state) => state.tiers);
  const { seriesList, loading: seriesLoading } = useAppSelector((state) => state.series);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const methods = useForm<PostFormValues>({
    defaultValues: {
      title: '',
      text: '',
      nsfw: false,
      tags: [],
      minTierId: '',
      seriesId: '',
      credits: [],
    },
    resolver: yupResolver(postSchema)
  });
  
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);

  const {user} = useAppSelector((state) => state.auth);
  const userId = user?.id || '';

  useEffect(() => {
    dispatch(getTiers(userId));
    dispatch(getSeries(userId));
  }, [dispatch]);

  const onSubmit = methods.handleSubmit((data) => {
    if (!mediaFile) {
      toast.error('Please provide a media file');
      return;
    }
    
    setApiError(null);

    const validCredits = data.credits
      .filter(credit => credit.userId && credit.description.trim())
      .map(credit => ({
        userId: credit.userId,
        description: credit.description.trim()
      }));

    const postData: PostCreateRequest = {
      title: data.title,
      text: data.text || undefined,
      nsfw: data.nsfw,
      tags: data.tags.join(','),
      media: mediaFile,
      thumb: thumbFile === mediaFile ? undefined : thumbFile || undefined,
      minTierId: data.minTierId && data.minTierId.trim() !== '' ? data.minTierId : undefined,
      seriesId: data.seriesId && data.seriesId.trim() !== '' ? data.seriesId : undefined,
      credits: validCredits.length > 0 ? validCredits : undefined
    };

    dispatch(createPost(postData));
  });
  
  useEffect(() => {
    if (success) {
      toast.success('Post created successfully!');
      router.push('/posts');
      dispatch(resetPostState());
    }
    if (error) {
      if (error.includes('MISSING_TAGS')) {
        setApiError('At least one tag is required');
        methods.setError('tags', { 
          type: 'manual',
          message: 'At least one tag is required'
        });
      } else {
        setApiError(error);
      }
      toast.error(error);
      dispatch(resetPostState());
    }
  }, [success, error, router, dispatch, methods]);

  return (
    <main className="bg-background min-h-screen">
      {open && <Sidebar />}
      <Navbar setActivemodal={() => {}} />
      
      <div className="pt-[100px] pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
        
        {apiError && (
          <Card className="mb-6 p-4 bg-danger-50 text-danger border border-danger">
            <p className="font-semibold">Error: {apiError}</p>
          </Card>
        )}
        
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="grid gap-6">
            <MediaUploadCard 
              mediaFile={mediaFile}
              setMediaFile={setMediaFile}
              thumbFile={thumbFile}
              setThumbFile={setThumbFile}
              mediaPreview={mediaPreview}
              setMediaPreview={setMediaPreview}
              thumbPreview={thumbPreview}
              setThumbPreview={setThumbPreview}
              mediaType={mediaType}
              setMediaType={setMediaType}
            />
            
            <PostDetailsForm 
              tiers={tiers}
              tiersLoading={tiersLoading}
              seriesList={seriesList}
              seriesLoading={seriesLoading}
            />
            
            <CreditsSection />
            
            <Button
              color="primary"
              size="lg"
              type="submit"
              isLoading={loading}
              className="w-full"
            >
              Create Post
            </Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}