"use client";

import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { createPlayer } from "../actions/player";

export default function AddPlayerModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    if (name.length === 0) {
      setIsError(true);
      return;
    }
    setIsError(false);

    createPlayer(name).then((response) => {
      console.log(response);
      if (response.isSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Dodaj gracza</ModalHeader>
        <Divider />
        <ModalBody className="mt-2">
          <Input
            type="text"
            label="Nazwa gracza"
            isInvalid={isError}
            errorMessage="Nazwa gracza jest wymagana"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            color="primary"
            onPress={handleSubmit}
            className="w-full"
          >
            Dodaj gracza
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
