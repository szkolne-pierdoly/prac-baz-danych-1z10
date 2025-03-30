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
import { useCallback, useEffect, useRef, useState } from "react";
import { Question } from "../models/Question";
import { getQuestions } from "../actions/question";

export default function SelectQuestionModal({
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
  const currentPageRef = useRef(1);

  const fetchQuestions = useCallback(
    async (page: number = 1) => {
      setIsLoading(true);
      const result = await getQuestions(page, undefined, searchName);
      if (result.isSuccess) {
        if (page === 1) {
          setQuestions(result.questions ?? []);
        } else {
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            ...(result.questions ?? []),
          ]);
        }
        setTotalItems(result.totalItems ?? 0);
        currentPageRef.current = page;
      }
      setIsLoading(false);
    },
    [searchName],
  );

  useEffect(() => {
    if (isOpen) {
      currentPageRef.current = 1;
      fetchQuestions(1);
    } else {
      setQuestions([]);
      setSearchName("");
      setTotalItems(0);
    }
  }, [isOpen, fetchQuestions]);

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
              fetchQuestions(1);
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
                    Podpowiedź: {question.variant2}
                  </div>
                  <div className="text-sm text-gray-500">
                    Podpowiedź 2: {question.variant3 ?? "Brak"}
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
                    fetchQuestions(currentPageRef.current + 1);
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
