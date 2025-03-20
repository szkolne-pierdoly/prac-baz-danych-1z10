"use client";

import { Button, Divider, ModalFooter } from "@heroui/react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { ArrowLeftRight, Plus, Save } from "lucide-react";
import { Question } from "../models/Question";
import { useEffect, useState } from "react";
import { updateQuestionInSequenceActions } from "../actions/sequence";
import SelectPart1QuestionModal from "./selectPart1QuestionModal";
import LoadingDialog from "./loadingDialog";

export default function QuestionDetailsModal({
  isOpen,
  onClose,
  question,
  onSave,
  sequenceId,
  focusedQuestionIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
  onSave: () => void;
  sequenceId: number;
  focusedQuestionIndex: number;
}) {
  const [focusedQuestion, setFocusedQuestion] = useState<Question | null>(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFocusedQuestion(question);
    } else {
      setFocusedQuestion(null);
    }
  }, [isOpen, question]);

  const handleSave = async () => {
    setIsLoading(true);
    const result = await updateQuestionInSequenceActions(
      sequenceId,
      1,
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
                <Button
                  variant="flat"
                  color="secondary"
                  fullWidth
                  startContent={<ArrowLeftRight className="outline-none" />}
                  onPress={() => setShowSelectModal(true)}
                >
                  Zamień pytanie
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <SelectPart1QuestionModal
        isOpen={showSelectModal}
        onClose={() => setShowSelectModal(false)}
        onSuccess={(question: Question) => {
          setFocusedQuestion(question);
          setShowSelectModal(false);
          setIsUpdated(true);
        }}
      />
      <LoadingDialog isLoading={isLoading} />
    </Modal>
  );
}
