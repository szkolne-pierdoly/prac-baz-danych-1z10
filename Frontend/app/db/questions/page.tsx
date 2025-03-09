"use client";

import { Question } from "../../models/Question";
import {
  Button,
  Card,
  CardBody,
  Input,
  ModalContent,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Divider,
} from "@heroui/react";
import { useEffect, useState } from "react";

export default function QuestionsPage() {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isSavingUpdate, setIsSavingUpdate] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSaveUpdate = () => {
    setIsSavingUpdate(true);
    fetch(`${apiUrl}/api/questions/${editingQuestion?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: editingQuestion?.content,
        hint: editingQuestion?.hint,
        hint2: editingQuestion?.hint2,
        correctAnswer: editingQuestion?.correctAnswer,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}, url: ${apiUrl}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.questions) {
          setQuestions(data.questions);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .then(() => {
        setIsSavingUpdate(false);
        setEditingQuestion(null);
      })
      .catch(() => {
        setIsSavingUpdate(false);
      });
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/questions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}, url: ${apiUrl}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.questions) {
          setQuestions(
            data.questions.map((question: Question) => ({
              id: question.id,
              content: question.content,
              hint: question.hint,
              hint2: question.hint2,
              correctAnswer: question.correctAnswer,
            })),
          );
        } else {
          console.error("Invalid data structure:", data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="text-2xl font-bold">Pytania</div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button variant="flat" color="primary">
              Dodaj pytanie
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl">
        <Table selectionMode="single">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Treść</TableColumn>
            <TableColumn>Podpowiedź</TableColumn>
            <TableColumn>Podpowiedź 2</TableColumn>
            <TableColumn>Poprawna Odpowiedź</TableColumn>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow
                key={question.id}
                onClick={() => setEditingQuestion(question)}
              >
                <TableCell>{question.id}</TableCell>
                <TableCell>{question.content}</TableCell>
                <TableCell>{question.hint}</TableCell>
                <TableCell>{question.hint2}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal
        isOpen={editingQuestion !== null}
        onClose={() => setEditingQuestion(null)}
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader>Edytuj pytanie</ModalHeader>
          <Divider />
          <ModalBody className="mt-2">
            {editingQuestion?.content && (
              <>
                <Input
                  label="Treść pytania"
                  isRequired
                  value={editingQuestion.content}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      content: e.target.value,
                    })
                  }
                />
                <Input
                  label="Podpowiedź"
                  isRequired
                  value={editingQuestion.hint}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      hint: e.target.value,
                    })
                  }
                />
                <Input
                  label="Podpowiedź 2"
                  isRequired
                  value={editingQuestion.hint2}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      hint2: e.target.value,
                    })
                  }
                />
                <Input
                  label="Poprawna odpowiedź"
                  isRequired
                  value={editingQuestion.correctAnswer}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      correctAnswer: e.target.value,
                    })
                  }
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="default"
              onPress={() => setEditingQuestion(null)}
            >
              Anuluj
            </Button>
            <Button
              variant="flat"
              color="primary"
              className="w-full"
              onPress={handleSaveUpdate}
              isLoading={isSavingUpdate}
            >
              Zapisz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
