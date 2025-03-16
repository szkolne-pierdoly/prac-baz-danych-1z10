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
import ImportQuestionsModal from "@/app/components/importQuestionsModal";
import DeleteMultipleQuestionsModal from "@/app/components/deleteMultipleQuestionsModal";

export default function QuestionsPage() {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showImportQuestions, setShowImportQuestions] = useState(false);
  const [isSavingUpdate, setIsSavingUpdate] = useState(false);
  const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);
  const [isSelectingQuestions, setIsSelectingQuestions] = useState(false);
  const [showDeleteMultipleQuestions, setShowDeleteMultipleQuestions] =
    useState(false);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set(),
  );

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
    <div className="flex flex-col items-center justify-start h-screen w-screen max-h-screen max-w-screen py-4 gap-4 px-2">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl h-[64px] min-h-[64px]">
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
            <div className="text-2xl font-bold">
              Pytania{" "}
              {selectedQuestions.size > 0 && `(${selectedQuestions.size})`}
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            {isSelectingQuestions && (
              <Button
                variant="light"
                color="danger"
                onPress={() => setShowDeleteMultipleQuestions(true)}
                isDisabled={selectedQuestions.size === 0}
              >
                Usuń zaznaczone pytania
              </Button>
            )}
            <Button
              variant="light"
              color="default"
              onPress={() => setIsSelectingQuestions(!isSelectingQuestions)}
            >
              {isSelectingQuestions ? "Zakończ" : "Zaznacz"}
            </Button>
            <Button
              variant="light"
              color="default"
              onPress={() => setShowImportQuestions(true)}
            >
              Zaimportuj z pliku
            </Button>
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
      <div className="w-full flex flex-col items-start justify-start max-w-4xl overflow-auto max-h-[calc(100vh-64px)]">
        <Table
          selectionMode={isSelectingQuestions ? "multiple" : "single"}
          className="w-full h-full"
          isHeaderSticky
          selectedKeys={selectedQuestions}
          onSelectionChange={(keys) => {
            if (keys === "all") {
              setSelectedQuestions(new Set(questions.map((q) => String(q.id))));
            } else if (keys === undefined) {
              setSelectedQuestions(new Set());
            } else {
              setSelectedQuestions(new Set([...keys].map(String)));
            }
          }}
        >
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
                key={String(question.id)}
                onClick={() =>
                  isSelectingQuestions ? null : setEditingQuestion(question)
                }
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
        onClose={() => {
          setShowAddQuestion(false);
          setSelectedQuestions(new Set());
        }}
        handleCreateQuestion={createQuestion}
        handleLoadQuestion={handleFetchQuestions}
      />
      {showLoading && (
        <div className="fixed w-screen h-screen flex flex-col items-center justify-center bg-black/50 top-0 left-0">
          <Spinner />
        </div>
      )}
      <ImportQuestionsModal
        isOpen={showImportQuestions}
        onClose={() => setShowImportQuestions(false)}
        onSuccess={() => {
          handleFetchQuestions();
          setSelectedQuestions(new Set());
          setShowImportQuestions(false);
        }}
      />
      <DeleteMultipleQuestionsModal
        isOpen={showDeleteMultipleQuestions}
        onClose={() => setShowDeleteMultipleQuestions(false)}
        onSuccess={() => {
          handleFetchQuestions();
          setSelectedQuestions(new Set());
          setIsSelectingQuestions(false);
        }}
        selectedQuestions={questions.filter((question) =>
          selectedQuestions.has(String(question.id)),
        )}
      />
    </div>
  );
}
