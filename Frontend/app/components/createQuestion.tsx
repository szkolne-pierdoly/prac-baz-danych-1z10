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

export default function CreateQuestion({
  isOpen,
  onClose,
  apiUrl,
  handleLoadQuestions,
}: {
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  handleLoadQuestions: () => void;
}) {
  const [addQuestionError, setAddQuestionError] = useState<boolean>(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [addQuestionContent, setAddQuestionContent] = useState<string | null>(
    null,
  );
  const [addQuestionHint, setAddQuestionHint] = useState<string | null>(null);
  const [addQuestionHint2, setAddQuestionHint2] = useState<string | null>(null);
  const [addQuestionCorrectAnswer, setAddQuestionCorrectAnswer] = useState<
    string | null
  >(null);

  const handleAddQuestion = () => {
    if (
      addQuestionContent === null ||
      addQuestionHint === null ||
      addQuestionCorrectAnswer === null ||
      addQuestionContent === "" ||
      addQuestionHint === "" ||
      addQuestionCorrectAnswer === ""
    ) {
      setAddQuestionError(true);
      return;
    } else {
      setAddQuestionError(false);
    }
    setIsAddingQuestion(true);
    fetch(`${apiUrl}/api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: addQuestionContent,
        hint: addQuestionHint,
        hint2: addQuestionHint2,
        correctAnswer: addQuestionCorrectAnswer,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}, url: ${apiUrl}`);
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        handleLoadQuestions();
        setIsAddingQuestion(false);
        setAddQuestionContent(null);
        setAddQuestionHint(null);
        setAddQuestionHint2(null);
        setAddQuestionCorrectAnswer(null);
        onClose();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>Dodaj pytanie</ModalHeader>
        <Divider />
        <ModalBody className="mt-2">
          {addQuestionError && (
            <div className="flex flex-col items-center justify-center gap-2 text-red-500">
              <div>Wypełnij wszystkie pola wymanage pola</div>
            </div>
          )}
          <Input
            label="Treść pytania"
            value={addQuestionContent || ""}
            onChange={(e) => setAddQuestionContent(e.target.value)}
            isRequired
          />
          <Input
            label="Podpowiedź"
            value={addQuestionHint || ""}
            onChange={(e) => setAddQuestionHint(e.target.value)}
            isRequired
          />
          <Input
            label="Podpowiedź 2"
            value={addQuestionHint2 || ""}
            onChange={(e) => setAddQuestionHint2(e.target.value)}
          />
          <Input
            label="Poprawna odpowiedź"
            value={addQuestionCorrectAnswer || ""}
            onChange={(e) => setAddQuestionCorrectAnswer(e.target.value)}
            isRequired
          />
        </ModalBody>
        <ModalFooter className="flex flex-row items-center">
          <Button
            variant="flat"
            color="default"
            onPress={() => onClose()}
            className="w-full"
          >
            Anuluj
          </Button>
          <Button
            variant="flat"
            color="primary"
            className="w-full"
            onPress={handleAddQuestion}
            isLoading={isAddingQuestion}
          >
            Dodaj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
