"use client";

import {
  Button,
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
  const [totalItems, setTotalItems] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    const currentPage = Math.floor(questions.length / 10) + 1;
    const result = await getQuestions(currentPage, undefined, searchName);
    if (result.isSuccess) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...(result.questions ?? []),
      ]);
      setTotalItems(result.totalItems ?? 0);
    }
    setIsLoading(false);
  }, [questions, searchName]);

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    } else {
      setQuestions([]);
      setSearchName("");
      setTotalItems(0);
    }
  }, [isOpen]);

  const handleSelect = (question: Question) => {
    onSuccess(question);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" className="h-[32rem]">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          Wybierz pytanie {questions.length} / {totalItems}
          <Input
            placeholder="Szukaj pytania"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setQuestions([]);
              fetchQuestions();
            }}
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
          <div className="flex flex-col gap-2 mb-3">
            {questions.map((question) => (
              <Card
                key={question.id}
                isPressable
                onPress={() => handleSelect(question)}
              >
                <CardBody className="bg-white/5">
                  <div className="text-lg font-bold">
                    {question.id}. {question.content}
                  </div>
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
            {questions.length < totalItems && (
              <div className="flex justify-center mt-3">
                <Button
                  variant="flat"
                  color="primary"
                  isLoading={isLoading}
                  onPress={() => {
                    fetchQuestions();
                  }}
                >
                  Załaduj więcej
                </Button>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
