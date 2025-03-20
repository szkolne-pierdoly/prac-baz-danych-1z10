"use client";

import {
  Card,
  CardBody,
  Divider,
  Input,
  ModalBody,
  ModalHeader,
  Spinner,
} from "@heroui/react";

import { ModalContent } from "@heroui/react";

import { Modal } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import { Question } from "../models/Question";
import { getQuestions } from "../actions/question";

export default function SelectPart1QuestionModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (question: Question) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [searchName, setSearchName] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    const result = await getQuestions(1, 10, searchName);
    if (result.isSuccess) {
      setQuestions(result.questions ?? []);
    }
    setIsLoading(false);
  }, [searchName]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions, searchName]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSelect = (question: Question) => {
    onSuccess(question);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" className="h-[32rem]">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          Wybierz pytanie
          <Input
            placeholder="Szukaj pytania"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </ModalHeader>
        <Divider />
        <ModalBody
          className={`overflow-y-${isLoading ? "hidden" : "auto"} relative`}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 h-full w-full">
              <Spinner size="lg" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            {questions.map((question) => (
              <Card
                key={question.id}
                isPressable
                onPress={() => handleSelect(question)}
              >
                <CardBody className="bg-white/5">
                  <div className="text-lg font-bold">{question.content}</div>
                  <div className="text-sm text-gray-500">
                    Podpowiedź: {question.hint}
                  </div>
                  <div className="text-sm text-gray-500">
                    Podpowiedź 2: {question.hint2 ?? "Brak"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Odpowiedź: {question.correctAnswer}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
