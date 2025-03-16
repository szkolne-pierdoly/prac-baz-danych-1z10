"use client";

import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Link,
  Divider,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { importQuestions } from "../actions/question";

export default function ImportQuestionsModel({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const xmlText = e.target?.result as string;

      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const questionsElement = xmlDoc.documentElement;
        if (questionsElement.tagName !== "Questions") {
          setError(
            "Nieprawidłowy format pliku XML. Oczekiwano elementu <Questions>.",
          );
          setFile(null);
          return;
        }

        const questionElements = questionsElement.children;
        for (let i = 0; i < questionElements.length; i++) {
          const questionElement = questionElements[i];
          if (questionElement.tagName !== "Question") {
            setError(
              "Nieprawidłowy format pliku XML. Oczekiwano elementu <Question> w <Questions>.",
            );
            setFile(null);
            return;
          }

          const contentElement = questionElement.querySelector("Content");
          const hintElement = questionElement.querySelector("Hint");
          const correctAnswerElement =
            questionElement.querySelector("CorrectAnswer");

          if (!contentElement || !hintElement || !correctAnswerElement) {
            setError(
              "Nieprawidłowy format pliku XML. Element Question powinien zawierać Content, Hint i CorrectAnswer oraz opcjonalnie Hint2.",
            );
            setFile(null);
            return;
          }
        }

        setError(null);
        setFile(file);
      } catch (error) {
        setError("Błąd parsowania pliku XML.");
        setFile(null);
        console.error("XML parsing error:", error);
      }
    };

    reader.onerror = () => {
      setError("Błąd odczytu pliku.");
    };

    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!file) {
      setError("Nie wybrano pliku.");
      return;
    }

    const result = await importQuestions(file);
    if (result.isSuccess) {
      onSuccess();
      onClose();
      setFile(null);
    } else {
      setError(result.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>Zaimportuj pytania</ModalHeader>
        <Divider />
        <ModalBody>
          <p>
            Zaimportuj pytania z pliku XML, Zobacz przykladowy plik{" "}
            <Link href="/db/questions/xml-example" target="_blank">
              tutaj
            </Link>
          </p>
          <Input
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            errorMessage={error}
            isInvalid={error !== null}
          />
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button
            variant="flat"
            color="primary"
            onPress={handleImport}
            className="w-full"
          >
            Importuj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
