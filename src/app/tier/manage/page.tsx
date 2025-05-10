'use client'

import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import TierManagement from '@/components/tier/TierManagement';

export default function ManageTiers() {
  const { open } = useSidebarContext();

  return (
    <main className="bg-background min-h-screen">
      {open && <Sidebar />}
      <Navbar setActivemodal={() => {}} />
      
      <TierManagement />
    </main>
  );
}
