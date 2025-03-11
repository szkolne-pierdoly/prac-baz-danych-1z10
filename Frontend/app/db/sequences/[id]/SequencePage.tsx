"use client";

import { Sequence } from "@/app/models/Sequence";
import {
  Card,
  CardBody,
  Divider,
  Table,
  TableColumn,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { Question } from "@/app/models/Question";
import AddQuestionModal from "./AddQuestionModal";
import { useRouter } from "next/navigation";
export default function SequenceClientPage({
  sequence,
}: {
  sequence: Sequence;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isDeleteSequenceModalOpen, setIsDeleteSequenceModalOpen] =
    useState(false);
  const [editingSequenceName, setEditingSequenceName] = useState(sequence.name);
  const [editingSequenceQuestionsId, setEditingSequenceQuestionsId] = useState(
    sequence.questions.map((question) => question.id),
  );
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [questions, setQuestions] = useState<
    { question: Question; isDeleted: boolean; isAdded: boolean }[]
  >([]);

  useEffect(() => {
    setQuestions(
      sequence.questions.map((question) => ({
        question: question,
        isDeleted: false,
        isAdded: false,
      })),
    );
  }, [sequence]);

  const handleSaveUpdate = async (): Promise<string> => {
    if (
      questions.length === 0 ||
      editingSequenceName === "" ||
      !editingSequenceName
    ) {
      return "EMPTY";
    }
    try {
      const res = await fetch(`${apiUrl}/api/sequences/${sequence.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingSequenceName,
          questionIds: questions
            .filter((question) => !question.isDeleted)
            .map((question) => question.question.id),
        }),
      });
      if (!res.ok) {
        res.json().then((data) => console.log(data));
        return "ERROR";
      }
      setIsEditing(false);
      return "SUCCESS";
    } catch (error) {
      console.error("Fetch error:", error);
      return "ERROR";
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditingSequenceName(sequence.name);
    setEditingSequenceQuestionsId(
      sequence.questions.map((question) => question.id),
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingSequenceName(sequence.name);
    setEditingSequenceQuestionsId(
      sequence.questions.map((question) => question.id),
    );
    setQuestions(
      sequence.questions.map((question) => ({
        question: question,
        isDeleted: false,
        isAdded: false,
      })),
    );
    setSelectedQuestions(undefined);
  };

  const handleAddQuestions = (questions: Question[]) => {
    setQuestions((prevQuestions) => {
      const existingQuestionIds = prevQuestions.map((q) => q.question.id);
      const newQuestionsToAdd = questions.filter(
        (q) => !existingQuestionIds.includes(q.id),
      );
      const newQuestionObjects = newQuestionsToAdd.map((q) => ({
        question: q,
        isDeleted: false,
        isAdded: true,
      }));
      return [...prevQuestions, ...newQuestionObjects];
    });
    setEditingSequenceQuestionsId([
      ...editingSequenceQuestionsId,
      ...questions.map((question) => question.id),
    ]);
  };

  const handleDelete = () => {
    const itemsToDelete = Array.from(selectedQuestions ?? []).map((item) =>
      parseInt(item as string, 10),
    );
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        itemsToDelete.includes(q.question.id) ? { ...q, isDeleted: true } : q,
      ),
    );
  };

  const handleDeleteSequence = () => {
    fetch(`${apiUrl}/api/sequences/${sequence.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        res.json().then((data) => console.log(data));
      } else {
        router.push("/db/sequences");
      }
    });
  };

  const handleRecover = () => {
    const selectedIdsToAdd = Array.from(selectedQuestions ?? []).map((item) =>
      parseInt(item as string, 10),
    );
    const updatedEditingSequenceQuestionsId = [
      ...(editingSequenceQuestionsId || []),
    ];
    selectedIdsToAdd.forEach((idToAdd) => {
      if (!updatedEditingSequenceQuestionsId.includes(idToAdd)) {
        updatedEditingSequenceQuestionsId.push(idToAdd);
      }
    });
    setEditingSequenceQuestionsId(updatedEditingSequenceQuestionsId);
  };

  const [selectedQuestions, setSelectedQuestions] = useState<
    "all" | Iterable<React.Key> | undefined
  >(undefined);

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl items-center justify-center">
      <Card className="w-full">
        <CardBody className="flex flex-row justify-between items-center">
          <div className="w-full">
            {isEditing ? (
              <Input
                value={editingSequenceName}
                onChange={(e) => setEditingSequenceName(e.target.value)}
                label="Nazwa sekwencji"
                size="sm"
                className="min-w-96 max-w-96"
              />
            ) : (
              <div className="text-2xl font-bold">
                Sekwencja: {sequence.name}
              </div>
            )}
          </div>
          {isEditing ? (
            <Button variant="flat" color="default" onPress={handleCancelEdit}>
              Anuluj
            </Button>
          ) : (
            <Button variant="faded" color="primary" onPress={handleEdit}>
              <PencilIcon size={16} />
              Edytuj
            </Button>
          )}
        </CardBody>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <div className="text-lg font-bold">Pytania:</div>
          <Table
            removeWrapper
            selectionMode={isEditing ? "multiple" : "none"}
            selectedKeys={selectedQuestions}
            onSelectionChange={setSelectedQuestions}
            className="rounded-lg overflow-hidden"
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Treść</TableColumn>
              <TableColumn>Podpowiedź</TableColumn>
              <TableColumn>Podpowiedź 2</TableColumn>
              <TableColumn>Odpowiedź</TableColumn>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow
                  key={question.question.id}
                  className={
                    question.isDeleted
                      ? "bg-red-700 bg-opacity-10 text-red-500"
                      : ""
                  }
                >
                  <TableCell>{question.question.id}</TableCell>
                  <TableCell>{question.question.content}</TableCell>
                  <TableCell>{question.question.hint}</TableCell>
                  <TableCell>{question.question.hint2 ?? "-"}</TableCell>
                  <TableCell>{question.question.correctAnswer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isEditing && (
            <div className="flex flex-row gap-2">
              {Array.from(selectedQuestions ?? []).length > 0 &&
              Array.from(selectedQuestions ?? []).every(
                (selectedQuestionId) =>
                  !editingSequenceQuestionsId?.includes(
                    parseInt(selectedQuestionId as string, 10),
                  ),
              ) ? (
                <Button variant="flat" color="primary" onPress={handleRecover}>
                  <PlusIcon size={16} />
                  Przywróć pytania
                </Button>
              ) : (
                <Button variant="flat" color="danger" onPress={handleDelete}>
                  <TrashIcon size={16} />
                  Usuń pytania
                </Button>
              )}
              <Button
                variant="flat"
                color="primary"
                className="w-full"
                onPress={() => setIsAddQuestionModalOpen(true)}
              >
                <PlusIcon size={16} />
                Dodaj pytania
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
      {isEditing && (
        <Card className="w-full">
          <CardBody className="flex flex-row gap-2">
            <Button
              variant="flat"
              color="danger"
              className="w-1/3"
              onPress={() => setIsDeleteSequenceModalOpen(true)}
            >
              Usuń sekwencję
            </Button>
            <Button
              variant="flat"
              color="primary"
              className="w-full"
              onPress={handleSaveUpdate}
            >
              Zapisz zmiany
            </Button>
          </CardBody>
        </Card>
      )}
      <AddQuestionModal
        isOpen={isAddQuestionModalOpen}
        onClose={() => setIsAddQuestionModalOpen(false)}
        includedQuestionIds={editingSequenceQuestionsId ?? []}
        handleAddQuestions={handleAddQuestions}
      />
      <Modal
        isOpen={isDeleteSequenceModalOpen}
        onClose={() => setIsDeleteSequenceModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Napewno?</ModalHeader>
          <ModalBody>
            Usunięcie sekwencji spowoduje usunięcie samej sekwencji, pytania
            dalej zostaną w bazie danych. Jest to akcja nieodwracalna!
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="danger"
              className="px-8"
              onPress={handleDeleteSequence}
            >
              Usuń sekwencję
            </Button>
            <Button
              variant="flat"
              color="success"
              className="w-full"
              onPress={() => setIsDeleteSequenceModalOpen(false)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
