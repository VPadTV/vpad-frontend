import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Radio, RadioGroup } from "@nextui-org/react"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

interface User {
  id: string;
  nickname: string;
}

interface BanModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (duration: string | null) => any
  user: User 
}

const banDurations = [
  { label: "Remove Ban", value: "remove" },
  { label: "24 Hours", value: "24h" },
  { label: "7 Days", value: "7d" },
  { label: "1 Month", value: "30d" },
  { label: "1 Year", value: "365d" },
  { label: "Permanent", value: "permanent" },
]

export function BanModal({ isOpen, onClose, onConfirm, user }: BanModalProps) {
  const [selected, setSelected] = useState<string>("24h")

  const handleConfirm = () => {
    if (selected === "remove") {
      onConfirm(null);
      return;
    }
    
    const duration = selected === "permanent" ? null : new Date(
      Date.now() + getDurationInMs(selected)
    ).toISOString()
    
    onConfirm(duration)
  }

  const getDurationInMs = (duration: string) => {
    const hours = {
      "24h": 24,
      "7d": 24 * 7,
      "30d": 24 * 30,
      "365d": 24 * 365,
    }[duration] || 24
    return hours * 60 * 60 * 1000
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        <ModalHeader>Ban User: {user.nickname}</ModalHeader>
        <ModalBody>
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            orientation="vertical"
            color="primary"
          >
            {banDurations.map((duration) => (
              <Radio key={duration.value} value={duration.value}>
                {duration.label}
              </Radio>
            ))}
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm}>Confirm Ban</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
