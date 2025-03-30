"use client";

import { useEffect, useState } from "react";
import { Question } from "@/app/models/Question";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Divider,
  Button,
  Link,
} from "@heroui/react";

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  onUpdate: (question: Question) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isSaving: boolean;
  isDeleting: boolean;
}

export default function EditQuestionModal({
  isOpen,
  onClose,
  question,
  onUpdate,
  onDelete,
  isSaving,
  isDeleting,
}: EditQuestionModalProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<Question | null>(
    question,
  );

  useEffect(() => {
    setEditedQuestion(question);
  }, [question]);

  const handleUpdate = async () => {
    if (!editedQuestion) return;
    await onUpdate(editedQuestion);
    onClose();
  };

  const handleDelete = async () => {
    if (!editedQuestion) return;
    await onDelete(editedQuestion.id);
    onClose();
    setShowConfirmDelete(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>Edytuj pytanie</ModalHeader>
        <Divider />
        <ModalBody className="mt-2">
          {editedQuestion?.content && (
            <>
              <Input
                label="ID"
                value={editedQuestion.id.toString() ?? "0"}
                isDisabled
              />
              <Input
                label="Treść pytania"
                isRequired
                value={editedQuestion.content ?? ""}
                onChange={(e) =>
                  setEditedQuestion({
                    ...editedQuestion,
                    content: e.target.value,
                  } as Question)
                }
              />
              <Input
                label="Podpowiedź"
                isRequired
                value={editedQuestion.variant2 ?? ""}
                onChange={(e) =>
                  setEditedQuestion({
                    ...editedQuestion,
                    variant2: e.target.value,
                  } as Question)
                }
              />
              <Input
                label="Podpowiedź 2"
                isRequired
                value={editedQuestion.variant3 ?? ""}
                onChange={(e) =>
                  setEditedQuestion({
                    ...editedQuestion,
                    variant3: e.target.value,
                  } as Question)
                }
              />
              <Input
                label="Poprawna odpowiedź"
                isRequired
                value={editedQuestion.correctAnswer ?? ""}
                onChange={(e) =>
                  setEditedQuestion({
                    ...editedQuestion,
                    correctAnswer: e.target.value,
                  } as Question)
                }
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" color="default" onPress={onClose}>
            Anuluj
          </Button>
          <Button
            variant="flat"
            color="primary"
            className="w-full"
            onPress={handleUpdate}
            isLoading={isSaving}
            isDisabled={isSaving}
          >
            Zapisz
          </Button>
        </ModalFooter>
        <Divider />
        <ModalFooter className="flex flex-row items-center justify-center">
          {showConfirmDelete ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <div>Napewno chcesz usunąć to pytanie?</div>
              <div className="flex flex-row items-center justify-center gap-2">
                <Button
                  variant="flat"
                  color="danger"
                  onPress={handleDelete}
                  isLoading={isDeleting}
                >
                  Usuń
                </Button>
                <Button
                  variant="flat"
                  color="default"
                  onPress={() => setShowConfirmDelete(false)}
                >
                  Anuluj
                </Button>
              </div>
            </div>
          ) : (
            <Link
              color="danger"
              onPress={() => {
                setShowConfirmDelete(true);
              }}
            >
              Usuń pytanie
            </Link>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
