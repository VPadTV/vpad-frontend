'use client'

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button
} from '@nextui-org/react';

interface EditSeriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (seriesName: string) => void;
  initialName: string;
  loading: boolean;
}

export default function EditSeriesModal({
  isOpen,
  onClose,
  onSave,
  initialName,
  loading
}: EditSeriesModalProps) {
  const [seriesName, setSeriesName] = useState('');
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSeriesName(initialName);
      setNameError('');
    }
  }, [isOpen, initialName]);

  const handleSave = () => {
    if (!seriesName.trim()) {
      setNameError('Series name is required');
      return;
    }
    onSave(seriesName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Series</ModalHeader>
        <ModalBody>
          <Input
            label="Series Name"
            value={seriesName}
            onChange={(e) => {
              setSeriesName(e.target.value);
              setNameError('');
            }}
            isInvalid={!!nameError}
            errorMessage={nameError}
            fullWidth
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave} isLoading={loading}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
