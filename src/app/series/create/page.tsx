'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Spacer } from '@nextui-org/react';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createSeries, resetSeriesState } from '@/redux/features/seriesSlice';
import toast from 'react-hot-toast';

export default function CreateSeries() {
  const { open } = useSidebarContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.series);
  
  // Form state
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Series name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(createSeries({ name }));
    }
  };
  
  useEffect(() => {
    if (success) {
      toast.success('Series created successfully!');
      router.push('/series/manage');
      dispatch(resetSeriesState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetSeriesState());
    }
  }, [success, error, router, dispatch]);

  return (
    <main className="bg-background min-h-screen">
      {open && <Sidebar />}
      <Navbar setActivemodal={() => {}} />
      
      <div className="pt-[100px] pb-16 px-4 sm:px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Series</h1>
        
        <Card className="p-6">
          <div className="space-y-4">
            <Input
              label="Series Name"
              placeholder="e.g. Tutorial Series, Behind the Scenes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
              isInvalid={!!nameError}
              errorMessage={nameError}
              fullWidth
            />
            
            <Spacer y={2} />
            
            <Button
              color="primary"
              size="lg"
              onClick={handleSubmit}
              isLoading={loading}
              className="w-full"
            >
              Create Series
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
