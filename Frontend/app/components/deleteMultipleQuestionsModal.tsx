"use client";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  Divider,
  Button,
  Checkbox,
} from "@heroui/react";
import { useState } from "react";
import { deleteMultipleQuestions } from "../actions/question";
import { Question } from "../models/Question";

export default function DeleteMultipleQuestionsModal({
  isOpen,
  onClose,
  onSuccess,
  selectedQuestions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedQuestions: Question[];
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDelete = async () => {
    await deleteMultipleQuestions(
      selectedQuestions.map((question) => question.id),
    );
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>Usuń zaznaczone pytania</ModalHeader>
        <Divider />
        <ModalBody>
          <div>
            Czy na pewno chcesz usunąć zaznaczone pytania? Ta{" "}
            <span className="text-danger">akcja jest nieodwracalna</span>.
          </div>
          <div className="text-danger font-bold">
            Pytania będą również usunięte z sekwencji w których sie znajdują!
          </div>
        </ModalBody>
        <Divider />
        <ModalBody>
          <Checkbox
            color="danger"
            className="text-danger"
            isSelected={isConfirmed}
            onValueChange={setIsConfirmed}
          >
            Chcę nieodwracalnie usunąć {selectedQuestions.length} zaznaczonych
            pytań
          </Checkbox>
        </ModalBody>
        <ModalBody>
          <Button
            variant="flat"
            color="danger"
            onPress={handleDelete}
            isDisabled={!isConfirmed}
          >
            Usuń
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
