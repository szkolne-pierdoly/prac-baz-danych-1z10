"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  NumberInput,
} from "@heroui/react";
import { useState } from "react";
import { reorderQuestionInSequenceActions } from "../actions/sequence";

export default function ReorderQuestionModal({
  isOpen,
  onClose,
  onSuccess,
  sequenceId,
  part,
  moveFrom,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sequenceId: number;
  part: number;
  moveFrom: number;
}) {
  const [newPosition, setNewPosition] = useState(1);

  const handleReorder = async () => {
    const result = await reorderQuestionInSequenceActions(
      sequenceId,
      part,
      moveFrom,
      newPosition,
    );
    if (result.isSuccess) {
      onSuccess();
      onClose();
    } else {
      console.error(result.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Przenieś pytanie</ModalHeader>
        <Divider />
        <ModalBody>
          <div className="text-sm text-gray-500">
            Przenieś pytanie z pozycji {moveFrom} na pozycję {newPosition}
          </div>
          <NumberInput
            label="Nowa pozycja"
            value={newPosition}
            onValueChange={setNewPosition}
          />
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button fullWidth variant="flat" onPress={onClose} color="secondary">
            Anuluj
          </Button>
          <Button
            fullWidth
            variant="flat"
            onPress={handleReorder}
            color="primary"
          >
            Przenieś
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
