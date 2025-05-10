'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, useDisclosure } from '@nextui-org/react';
import { FaPlus } from 'react-icons/fa';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import { useSidebarContext } from '@/contexts/SidebarContext';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSeries, updateSeries, deleteSeries, resetSeriesState } from '@/redux/features/seriesSlice';
import toast from 'react-hot-toast';
import SeriesTable from '@/components/series/SeriesTable';
import EditSeriesModal from '@/components/series/EditSeriesModal';
import DeleteConfirmationModal from '@/components/series/DeleteConfirmationModal';

export default function ManageSeries() {
  const { open } = useSidebarContext();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const userId = user?.id || '';

  const { seriesList, loading, success, error } = useAppSelector((state) => state.series);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSeries, setSelectedSeries] = useState<{ id: string, name: string } | null>(null);
  const deleteModal = useDisclosure();
  const [seriesToDelete, setSeriesToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getSeries(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      toast.success('Series updated successfully!');
      onClose();
      deleteModal.onClose();
      dispatch(resetSeriesState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetSeriesState());
    }
  }, [success, error, dispatch, onClose, deleteModal]);

  const handleEditClick = (series: { id: string, name: string }) => {
    setSelectedSeries(series);
    onOpen();
  };

  const handleDeleteClick = (seriesId: string) => {
    setSeriesToDelete(seriesId);
    deleteModal.onOpen();
  };

  const handleUpdateSeries = (newName: string) => {
    if (!selectedSeries) return;
    
    dispatch(updateSeries({ 
      id: selectedSeries.id, 
      seriesData: { name: newName } 
    }));
  };

  const handleDeleteSeries = () => {
    if (seriesToDelete) {
      dispatch(deleteSeries(seriesToDelete));
    }
  };

  return (
    <main className="bg-background min-h-screen">
      {open && <Sidebar />}
      <Navbar setActivemodal={() => {}} />
      
      <div className="pt-[100px] pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Series</h1>
          <Button 
            color="primary" 
            onClick={() => router.push('/series/create')}
            startContent={<FaPlus />}
          >
            Create Series
          </Button>
        </div>
        
        <SeriesTable
          seriesList={seriesList || []}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      <EditSeriesModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleUpdateSeries}
        initialName={selectedSeries?.name || ''}
        loading={loading}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onDelete={handleDeleteSeries}
        loading={loading}
      />
    </main>
  );
}
