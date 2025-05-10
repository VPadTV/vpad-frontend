'use client'

import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import PostsGrid from '@/components/posts/PostsGrid';

export default function PostsPage() {
  const { open } = useSidebarContext();

  return (
    <main className="bg-background min-h-screen">
      {open
        &&
        <Sidebar />
      }
      <Navbar setActivemodal={() => { }} />

      <div className="pt-[100px] pb-16 px-4 md:px-6">
        <PostsGrid />
      </div>
    </main>
  );
}
