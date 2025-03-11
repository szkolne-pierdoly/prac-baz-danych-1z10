"use client";

import { Question } from "@/app/models/Question";
import {
  Button,
  Checkbox,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function AddQuestionModal({
  isOpen,
  onClose,
  includedQuestionIds,
  handleAddQuestions,
}: {
  isOpen: boolean;
  onClose: () => void;
  includedQuestionIds: number[];
  handleAddQuestions: (questions: Question[]) => void;
}) {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [idsToAdd, setIdsToAdd] = useState<number[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchAllQuestions = useCallback(() => {
    setIsQuestionsLoading(true);
    fetch(`${apiUrl}/api/questions`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions: " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setAllQuestions(data.questions);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsQuestionsLoading(false);
      });
  }, [apiUrl, setIsQuestionsLoading, setAllQuestions]);

  useEffect(() => {
    if (isOpen) {
      fetchAllQuestions();
    }
  }, [isOpen, fetchAllQuestions]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <ModalHeader>Dodaj pytanie</ModalHeader>
        <Divider />
        <ModalBody>
          {isQuestionsLoading ? (
            <div className="w-full min-h-72 h-full flex justify-center items-center flex-col gap-4">
              <Spinner size="lg" />
              <p>Ładowanie, prosze czekać...</p>
            </div>
          ) : (
            <div className="flex flex-col min-h-72 gap-2 mt-2 mb-4">
              {allQuestions
                .filter(
                  (question) => !includedQuestionIds.includes(question.id),
                )
                .map((question) => (
                  <div
                    key={question.id}
                    className={`bg-white/5 p-2 px-4 rounded-lg border border-white/5 shadow-md flex flex-row gap-2 ${includedQuestionIds.includes(question.id) ? "opacity-30" : ""}`}
                    onClick={() => {
                      if (idsToAdd.includes(question.id)) {
                        setIdsToAdd(idsToAdd.filter((id) => id !== question.id));
                      } else {
                        setIdsToAdd([...idsToAdd, question.id]);
                      }
                    }}
                  >
                    <Checkbox
                      isDisabled={includedQuestionIds.includes(question.id)}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.checked) {
                          setIdsToAdd([...idsToAdd, question.id]);
                        } else {
                          setIdsToAdd(
                            idsToAdd.filter((id) => id !== question.id),
                          );
                        }
                      }}
                      isSelected={idsToAdd.includes(question.id)}
                    />
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">{question.content}</p>
                      <p className="text-sm text-white/50">
                        Poprawna odpowiedź: {question.correctAnswer}
                      </p>
                      <p className="text-sm text-white/50">
                        Podpowiedź: {question.hint}, Podpowiedź 2:{" "}
                        {question.hint2 ?? "Brak"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex flex-row justify-between">
          <Button variant="flat" color="default" onPress={onClose}>
            Anuluj
          </Button>
          <Button
            variant="flat"
            color="primary"
            onPress={() =>
              handleAddQuestions(
                idsToAdd.map(
                  (id) => allQuestions.find((question) => question.id === id)!,
                ),
              )
            }
            isDisabled={idsToAdd.length === 0}
          >
            Dodaj pytania
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
