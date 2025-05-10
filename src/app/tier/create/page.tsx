'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createTier, resetTierState } from '@/redux/features/tierSlice';
import toast from 'react-hot-toast';
import TierForm from '@/components/tier/TierForm';

export default function CreateTier() {
  const { open } = useSidebarContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, success, error } = useAppSelector((state) => state.tiers);

  const handleSubmit = ({ name, price }: { name: string; price: string }) => {
    dispatch(createTier({ name, price }));
  };
  
  useEffect(() => {
    if (success) {
      toast.success('Subscription tier created successfully!');
      router.push('/tier/manage');
      dispatch(resetTierState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetTierState());
    }
  }, [success, error, router, dispatch]);

  return (
    <main className="bg-background min-h-screen">
      {open && <Sidebar />}
      <Navbar setActivemodal={() => {}} />
      
      <div className="pt-[100px] pb-16 px-4 sm:px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Subscription Tier</h1>
        <TierForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </main>
  );
}