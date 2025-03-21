"use client";

import { Button, Divider, ModalFooter } from "@heroui/react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { ArrowLeftRight, Plus, Save, Trash } from "lucide-react";
import { Question } from "../models/Question";
import { useEffect, useState } from "react";
import { updateQuestionInSequenceActions } from "../actions/sequence";
import LoadingDialog from "./loadingDialog";
import SelectQuestionModal from "./selectQuestionModal";

export default function QuestionDetailsModal({
  isOpen,
  onClose,
  question,
  onSave,
  sequenceId,
  part,
  focusedQuestionIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  onSave: () => void;
  sequenceId: number;
  part: number;
  focusedQuestionIndex: number;
}) {
  const [focusedQuestion, setFocusedQuestion] = useState<Question | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setFocusedQuestion(question);
    } else {
      setFocusedQuestion(null);
      setIsUpdated(false);
      setShowSelectModal(false);
      setIsLoading(false);
    }
  }, [isOpen, question]);

  const handleSave = async () => {
    setIsLoading(true);
    const result = await updateQuestionInSequenceActions(
      sequenceId,
      part,
      focusedQuestionIndex ?? 0,
      focusedQuestion?.id ?? 0,
    );
    if (result.isSuccess) {
      setIsUpdated(false);
    } else {
      console.error(result.message);
    }
    setIsLoading(false);
    onSave();
    onClose();
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await updateQuestionInSequenceActions(
      sequenceId,
      part,
      focusedQuestionIndex ?? 0,
      -1,
    );
    if (result.isSuccess) {
      setIsLoading(false);
      onSave();
      onClose();
    } else {
      console.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Szczegóły pytania nr {focusedQuestionIndex}</ModalHeader>
        <Divider />
        <ModalBody>
          {focusedQuestion ? (
            <div className="flex flex-col gap-2">
              <div>
                <div className="text-gray-500 text-sm">Pytanie:</div>
                <div>{focusedQuestion.content}</div>
              </div>
              <Divider />
              <div>
                <div className="text-gray-500 text-sm">Poprawna odpowiedź:</div>
                <div>{focusedQuestion.correctAnswer}</div>
              </div>
              <Divider />
              <div>
                <div className="text-gray-500 text-sm">Podpowiedź: </div>
                <div>{focusedQuestion.hint}</div>
              </div>
              <Divider />
              <div>
                <div className="text-gray-500 text-sm">Podpowiedź 2:</div>
                <div>{focusedQuestion.hint2 ?? "-"}</div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-xl font-bold text-center">
                Brak wybranego pytania
              </div>
              <Button
                variant="flat"
                color="primary"
                fullWidth
                startContent={<Plus className="outline-none" />}
                onPress={() => setShowSelectModal(true)}
              >
                Wybierz pytanie
              </Button>
            </div>
          )}
        </ModalBody>
        {focusedQuestion && (
          <>
            <Divider />
            <ModalFooter>
              {isUpdated ? (
                <div className="flex flex-row gap-2 w-full">
                  <Button
                    variant="flat"
                    color="secondary"
                    className="w-full"
                    fullWidth
                    startContent={<ArrowLeftRight className="outline-none" />}
                    onPress={() => setShowSelectModal(true)}
                  >
                    Zamień pytanie
                  </Button>
                  <Button
                    variant="flat"
                    color="success"
                    className="w-full"
                    startContent={<Save className="outline-none" />}
                    onPress={handleSave}
                  >
                    Zapisz
                  </Button>
                </div>
              ) : (
                <div className="flex flex-row gap-2 w-full">
                  <Button
                    variant="flat"
                    color="secondary"
                    fullWidth
                    startContent={<ArrowLeftRight className="outline-none" />}
                    onPress={() => setShowSelectModal(true)}
                  >
                    Zamień pytanie
                  </Button>
                  <Button
                    variant="flat"
                    color="danger"
                    isIconOnly
                    onPress={() => setShowDeleteModal(true)}
                  >
                    <Trash className="outline-none" />
                  </Button>
                </div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <SelectQuestionModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSuccess={(question: Question) => {
          setFocusedQuestion(question);
          setShowSelectModal(false);
          setIsUpdated(true);
        }}
      />
      <LoadingDialog isLoading={isLoading} />
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <ModalHeader>Usuń pytanie</ModalHeader>
          <ModalBody>
            <div className="text-center text-sm">
              Czy na pewno chcesz usunąć to pytanie? Akcja ta jest
              nieodwracalna. Pytanie zostanie usunięte tylko z tej sekwencji,
              dalej będzie w bazie danych oraz innych sekwencjach.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" color="danger" onPress={handleDelete}>
              Usuń
            </Button>
            <Button
              variant="flat"
              color="primary"
              fullWidth
              onPress={() => setShowDeleteModal(false)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Modal>
  );
}
