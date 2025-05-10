import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface DeleteTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  onDelete: () => void;
  loading: boolean;
}

export default function DeleteTierModal({
  isOpen,
  onClose,
  tierName,
  onDelete,
  loading
}: DeleteTierModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete the tier "{tierName}"?</p>
          <p className="text-danger mt-2">This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" onPress={onDelete} isLoading={loading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
