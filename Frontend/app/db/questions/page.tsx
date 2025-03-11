"use client";

import { useEffect, useState } from "react";
import { Question } from "@/app/models/Question";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
import CreateQuestion from "@/app/components/createQuestionModal";
import { HomeIcon } from "lucide-react";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "@/app/actions/question";
import EditQuestionModal from "@/app/components/editQuestionModal";

export default function QuestionsPage() {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [isSavingUpdate, setIsSavingUpdate] = useState(false);
  const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const router = useRouter();

  useEffect(() => {
    handleFetchQuestions();
  }, []);

  const handleFetchQuestions = async () => {
    setShowLoading(true);
    const result = await getQuestions();
    if (result.isSuccess) {
      setQuestions(result.questions ?? []);
    }
    setShowLoading(false);
  };

  const handleUpdateQuestion = async (updatedQuestion: Question) => {
    setIsSavingUpdate(true);
    const result = await updateQuestion(updatedQuestion);
    if (result.isSuccess) {
      setQuestions(
        questions.map((q) =>
          q.id === updatedQuestion?.id ? (result.question ?? q) : q,
        ),
      );
    }
    setIsSavingUpdate(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = async (id: number) => {
    setIsDeletingQuestion(true);
    const result = await deleteQuestion(id);
    if (result.isSuccess) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
    setIsDeletingQuestion(false);
    setEditingQuestion(null);
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
                <TableCell>{question.hint2 ?? "-"}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EditQuestionModal
        isOpen={editingQuestion !== null}
        onClose={() => setEditingQuestion(null)}
        question={editingQuestion}
        onUpdate={handleUpdateQuestion}
        onDelete={handleDeleteQuestion}
        isSaving={isSavingUpdate}
        isDeleting={isDeletingQuestion}
      />
      <CreateQuestion
        isOpen={showAddQuestion}
        onClose={() => setShowAddQuestion(false)}
        handleCreateQuestion={createQuestion}
        handleLoadQuestion={handleFetchQuestions}
      />
      {showLoading && (
        <div className="fixed w-screen h-screen flex flex-col items-center justify-center bg-black/50 top-0 left-0">
          <Spinner />
        </div>
      )}
    </div>
  );
}
