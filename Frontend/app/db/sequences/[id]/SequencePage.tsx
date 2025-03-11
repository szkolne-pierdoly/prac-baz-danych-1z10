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
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Question } from "@/app/models/Question";
import AddQuestionModal from "../../../components/AddQuestionModal";
import { useRouter } from "next/navigation";
import { Key } from "@react-types/shared";
import {
  deleteSequence,
  updateSequence,
  getSequence as getSequenceAction,
} from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/LoadingDialog";
export default function SequenceClientPage({
  sequenceId,
}: {
  sequenceId: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isDeleteSequenceModalOpen, setIsDeleteSequenceModalOpen] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [editingSequenceName, setEditingSequenceName] = useState("");
  const [editingSequenceQuestionsId, setEditingSequenceQuestionsId] = useState<
    number[]
  >([]);

  const [sequence, setSequence] = useState<Sequence | null>(null);

  const [questions, setQuestions] = useState<
    { question: Question; isDeleted: boolean; isAdded: boolean }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    getSequence();
  }, []);

  const getSequence = async () => {
    if (sequenceId) {
      setIsLoading(true);
      const result = await getSequenceAction(sequenceId);
      if (result.isSuccess) {
        setSequence(result.sequence ?? null);
        setQuestions(
          result.sequence?.questions.map((question) => ({
            question: question,
            isDeleted: false,
            isAdded: false,
          })) ?? [],
        );
      }
      setIsLoading(false);
    }
  };

  const handleSaveUpdate = async (): Promise<string> => {
    if (
      questions.length === 0 ||
      editingSequenceName === "" ||
      !editingSequenceName
    ) {
      return "EMPTY";
    }
    if (sequence) {
      setIsLoading(true);
      const result = await updateSequence(
        sequence.id,
        editingSequenceName,
        editingSequenceQuestionsId,
      );
      if (result.isSuccess) {
        setIsEditing(false);
        setIsLoading(false);
        return "SUCCESS";
      }
      setIsLoading(false);
    }
    setIsLoading(false);
    return "ERROR";
  };

  const handleEdit = () => {
    if (sequence) {
      setIsEditing(true);
      setEditingSequenceName(sequence.name);
      setEditingSequenceQuestionsId(
        sequence.questions.map((question) => question.id),
      );
    }
  };

  const handleCancelEdit = () => {
    if (sequence) {
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
    }
  };

  const handleAddQuestions = (questions: Question[]) => {
    setQuestions((prevQuestions) => {
      const existingQuestionIdMap = new Map<number, number>();
      prevQuestions.forEach((q, index) => {
        existingQuestionIdMap.set(q.question.id, index);
      });
      const newQuestionObjects: {
        question: Question;
        isDeleted: boolean;
        isAdded: boolean;
      }[] = [];

      const updatedPrevQuestions = [...prevQuestions]; // Create a copy to avoid direct mutation

      questions.forEach((q) => {
        if (existingQuestionIdMap.has(q.id)) {
          const index = existingQuestionIdMap.get(q.id) as number;
          if (updatedPrevQuestions[index].isDeleted) {
            updatedPrevQuestions[index] = {
              ...updatedPrevQuestions[index],
              isDeleted: false,
              isAdded: false,
            };
          }
        } else {
          newQuestionObjects.push({
            question: q,
            isDeleted: false,
            isAdded: false,
          });
        }
      });
      return [...updatedPrevQuestions, ...newQuestionObjects];
    });
    setIsLoading(true);
    setEditingSequenceQuestionsId([
      ...editingSequenceQuestionsId,
      ...questions.map((question) => question.id),
    ]);
    setIsAddQuestionModalOpen(false);
    setIsLoading(false);
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

  const handleDeleteSequence = async () => {
    if (sequence) {
      const result = await deleteSequence(sequence.id);
      if (result.isSuccess) {
        router.push("/db/sequences");
      }
    }
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
    "all" | Iterable<Key> | undefined
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
                Sekwencja: {sequence?.name}
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
      <LoadingDialog isLoading={isLoading} />
    </div>
  );
}
