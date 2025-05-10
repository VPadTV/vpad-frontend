import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

interface EditTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  onNameChange: (newName: string) => void;
  onUpdate: () => void;
  loading: boolean;
  nameError: string;
}

export default function EditTierModal({
  isOpen,
  onClose,
  tierName,
  onNameChange,
  onUpdate,
  loading,
  nameError
}: EditTierModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Tier</ModalHeader>
        <ModalBody>
          <Input
            label="Tier Name"
            placeholder="Enter tier name"
            value={tierName}
            onChange={(e) => onNameChange(e.target.value)}
            isInvalid={!!nameError}
            errorMessage={nameError}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onUpdate} isLoading={loading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
