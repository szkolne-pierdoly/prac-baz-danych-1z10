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
} from "@heroui/react";
import { useState } from "react";

export default function CreateSequence({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [sequenceName, setSequenceName] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleAddSequence = () => {
    if (sequenceName === "") {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);

    fetch(`${apiUrl}/api/sequences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: sequenceName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onClose();
      })
      .catch((err) => console.error("Error adding sequence:", err));
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
    </Modal>
  );
}
