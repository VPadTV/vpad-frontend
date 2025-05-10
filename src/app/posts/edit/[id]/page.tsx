'use client'

import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import EditPostForm from '@/components/posts/EditPostForm';

export default function EditPost({ params }: { params: { id: string } }) {
  const { open } = useSidebarContext();

  return (
    <main className="bg-background min-h-screen">
      {open && <Sidebar />}
      <Navbar setActivemodal={() => {}} />
      
      <div className="pt-[100px] pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <EditPostForm postId={params.id} />
      </div>
    </main>
  );
}