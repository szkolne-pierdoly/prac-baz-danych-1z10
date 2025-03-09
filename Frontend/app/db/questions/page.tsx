"use client";

import HomeIcon from "../../assets/icons/HomeIcon";
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
  Link,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function QuestionsPage() {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [isSavingUpdate, setIsSavingUpdate] = useState(false);
  const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const [addQuestionError, setAddQuestionError] = useState<boolean>(false);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [addQuestionContent, setAddQuestionContent] = useState<string | null>(
    null,
  );
  const [addQuestionHint, setAddQuestionHint] = useState<string | null>(null);
  const [addQuestionHint2, setAddQuestionHint2] = useState<string | null>(null);
  const [addQuestionCorrectAnswer, setAddQuestionCorrectAnswer] = useState<
    string | null
  >(null);

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSaveUpdate = () => {
    if (!editingQuestion) {
      setEditingQuestion(null);
      return;
    }

    const { content, hint, hint2, correctAnswer, id } = editingQuestion;

    if (!content || !hint || !correctAnswer) {
      console.error("Content, hint, and correct answer are required.");
      return;
    }

    const originalQuestion = questions.find((q) => q.id === id);

    if (
      originalQuestion?.content === content &&
      originalQuestion?.hint === hint &&
      originalQuestion?.hint2 === hint2 &&
      originalQuestion?.correctAnswer === correctAnswer
    ) {
      setEditingQuestion(null);
      return;
    }

    setIsSavingUpdate(true);

    fetch(`${apiUrl}/api/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        hint,
        hint2,
        correctAnswer,
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
      .finally(() => {
        setIsSavingUpdate(false);
        setEditingQuestion(null);
      });
  };

  const handleLoadQuestions = () => {
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
  };

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
        setShowAddQuestion(false);
      });
  };

  useEffect(() => {
    handleLoadQuestions();
  }, []);

  const handleDeleteQuestion = () => {
    setIsDeletingQuestion(true);
    fetch(`${apiUrl}/api/questions/${editingQuestion?.id}`, {
      method: "DELETE",
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
        setEditingQuestion(null);
        setShowConfirmDelete(false);
        setIsDeletingQuestion(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="default"
              onPress={() => router.push("/")}
              isIconOnly
            >
              <HomeIcon />
            </Button>
            <div className="text-2xl font-bold">Pytania</div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => setShowAddQuestion(true)}
            >
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
                  label="ID"
                  value={editingQuestion.id.toString() ?? "0"}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      id: parseInt(e.target.value),
                    })
                  }
                  isDisabled
                />
                <Input
                  label="Treść pytania"
                  isRequired
                  value={editingQuestion.content ?? ""}
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
                  value={editingQuestion.hint ?? ""}
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
                  value={editingQuestion.hint2 ?? ""}
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
                  value={editingQuestion.correctAnswer ?? ""}
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
          <Divider />
          <ModalFooter className="flex flex-row items-center justify-center">
            {showConfirmDelete ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <div>Napewno chcesz usunąć to pytanie?</div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Button
                    variant="flat"
                    color="danger"
                    onPress={handleDeleteQuestion}
                    isLoading={isDeletingQuestion}
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
      <Modal
        isOpen={showAddQuestion}
        onClose={() => setShowAddQuestion(false)}
        isDismissable={false}
      >
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
              onPress={() => setShowAddQuestion(false)}
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
    </div>
  );
}
