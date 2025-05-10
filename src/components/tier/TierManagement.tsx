import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, useDisclosure } from '@nextui-org/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTiers, updateTier, deleteTier, resetTierState } from '@/redux/features/tierSlice';
import toast from 'react-hot-toast';

import TierHeader from './TierHeader';
import TiersTable from './TiersTable';
import EditTierModal from './EditTierModal';
import DeleteTierModal from './DeleteTierModal';

export default function TierManagement() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tiers, loading, success, error } = useAppSelector((state) => state.tiers);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [editingTier, setEditingTier] = useState<{ id: string; name: string } | null>(null);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState('');
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [deletingTier, setDeletingTier] = useState<{ id: string; name: string } | null>(null);
  const {user} = useAppSelector((state) => state.auth);
  const userId = user?.id || '';



  useEffect(() => {
    if (userId) {
      dispatch(getTiers(userId));
    } else {
      toast.error('User data not found, please log in again');
      router.push('/signin');
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (success) {
      if (editingTier) {
        toast.success('Tier updated successfully!');
        onEditClose();
        setEditingTier(null);
      } else if (deletingTier) {
        toast.success('Tier deleted successfully!');
        onDeleteClose();
        setDeletingTier(null);
      }
      dispatch(resetTierState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetTierState());
    }
  }, [success, error, dispatch, onEditClose, onDeleteClose, editingTier, deletingTier]);

  const handleOpenEditModal = (tier: { id: string; name: string }) => {
    setEditingTier(tier);
    setNewName(tier.name);
    setNameError('');
    onEditOpen();
  };

  const handleOpenDeleteModal = (tier: { id: string; name: string }) => {
    setDeletingTier(tier);
    onDeleteOpen();
  };

  const handleUpdate = () => {
    if (!newName.trim()) {
      setNameError('Tier name is required');
      return;
    }
    
    if (editingTier) {
      dispatch(updateTier({
        id: editingTier.id,
        tierData: { name: newName.trim() }
      }));
    }
  };

  const handleDelete = () => {
    if (deletingTier) {
      dispatch(deleteTier(deletingTier.id));
    }
  };

  const handleNavigateToCreate = () => {
    router.push('/tier/create');
  };

  return (
    <div className="pt-[100px] pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <TierHeader title="Manage Subscription Tiers" />
      
      <Card className="p-6">
        <TiersTable 
          tiers={tiers} 
          loading={loading} 
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onCreate={handleNavigateToCreate}
        />
      </Card>
      
      <EditTierModal 
        isOpen={isEditOpen}
        onClose={onEditClose}
        tierName={newName}
        onNameChange={setNewName}
        onUpdate={handleUpdate}
        loading={loading}
        nameError={nameError}
      />
      
      <DeleteTierModal 
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        tierName={deletingTier?.name || ''}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}
