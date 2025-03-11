"use client";

import {
  Modal,
  ModalBody,
  Input,
  Button,
  ModalContent,
  ModalHeader,
  Divider,
  ModalFooter,
  Spinner,
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSequence } from "../actions/sequence";
export default function CreateSequenceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [sequenceName, setSequenceName] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddSequence = async () => {
    setIsLoading(true);
    if (sequenceName === "") {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);

    const result = await createSequence(sequenceName, []);
    if (result.isSuccess && result.sequence) {
      router.push(`/db/sequences/${result.sequence?.id}`);
      onClose();
    } else {
      setEmptyError(true);
      setSequenceName("");
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>Dodaj sekwencję</ModalHeader>
        <Divider />
        <ModalBody className="mt-2">
          {emptyError && (
            <div className="flex flex-col items-center justify-center gap-2 text-red-500">
              <div>Wypełnij wszystkie pola wymanage pola</div>
            </div>
          )}
          <Input
            label="Nazwa sekwencji"
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={handleAddSequence}
            className="w-full"
            color="primary"
            variant="flat"
          >
            Dodaj sekwencję
          </Button>
        </ModalFooter>
      </ModalContent>
      {isLoading && (
        <div className="fixed w-screen h-screen flex flex-col items-center justify-center bg-black/50 top-0 left-0 z-50">
          <Spinner />
        </div>
      )}
    </Modal>
  );
}
