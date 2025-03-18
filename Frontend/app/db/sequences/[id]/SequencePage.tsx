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
import { PencilIcon, PlusIcon, TrashIcon, HomeIcon } from "lucide-react";
import { Question } from "@/app/models/Question";
import AddQuestionModal from "@/app/components/addQuestionModal";
import { useRouter, usePathname } from "next/navigation";
import { Key } from "@react-types/shared";
import {
  deleteSequence,
  updateSequence,
  getSequence as getSequenceAction,
} from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import CreateSequenceModal from "@/app/components/createSequenceModal";

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

  const [sequence, setSequence] = useState<Sequence | null>(null);

  const [part1Questions, setPart1Questions] = useState<
    {
      question: Question;
      isDeleted: boolean;
      isAdded: boolean;
      index: number;
    }[]
  >([]);
  const [part2Questions, setPart2Questions] = useState<
    {
      question: Question;
      isDeleted: boolean;
      isAdded: boolean;
      index: number;
    }[]
  >([]);
  const [part3Questions, setPart3Questions] = useState<
    {
      question: Question;
      isDeleted: boolean;
      isAdded: boolean;
      index: number;
    }[]
  >([]);

  const router = useRouter();
  const pathname = usePathname();
  const [showCreateSequenceModal, setShowCreateSequenceModal] = useState(false);

  useEffect(() => {
    getSequence();
  }, []);

  const getSequence = async () => {
    if (sequenceId) {
      setIsLoading(true);
      const result = await getSequenceAction(sequenceId);
      console.log(result);
      if (result.isSuccess) {
        setPart1Questions(
          result.sequence?.part1Questions.map((question) => ({
            question: question.question,
            isDeleted: false,
            isAdded: false,
            index: question.order,
          })) ?? [],
        );
        setPart2Questions(
          result.sequence?.part2Questions.map((question) => ({
            question: question.question,
            isDeleted: false,
            isAdded: false,
            index: question.order,
          })) ?? [],
        );
        setPart3Questions(
          result.sequence?.part3Questions.map((question) => ({
            question: question.question,
            isDeleted: false,
            isAdded: false,
            index: question.order,
          })) ?? [],
        );
      }
      setIsLoading(false);
    }
  };

  const handleSaveUpdate = async (): Promise<string> => {
    if (editingSequenceName === "" || !editingSequenceName) {
      return "EMPTY";
    }
    if (sequence) {
      setIsLoading(true);
      const result = await updateSequence(
        sequence.id,
        editingSequenceName,
        part1Questions
          .filter((question) => !question.isDeleted)
          .map((question) => question.question.id),
      );
      if (result.isSuccess) {
        setIsEditing(false);
        setIsLoading(false);
        setSelectedQuestions(undefined);
        getSequence();
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
      setPart1Questions(
        sequence.part1Questions.map((question) => ({
          question: question.question,
          isDeleted: false,
          isAdded: false,
          index: question.order,
        })),
      );
    }
  };

  const handleCancelEdit = () => {
    if (sequence) {
      setIsEditing(false);
      setEditingSequenceName(sequence.name);
      setPart1Questions(
        sequence.part1Questions.map((question) => ({
          question: question.question,
          isDeleted: false,
          isAdded: false,
          index: question.order,
        })),
      );
      setSelectedQuestions(undefined);
    }
  };

  const handleAddQuestions = (questions: Question[]) => {
    setPart1Questions((prevQuestions) => {
      const existingQuestionIdMap = new Map<number, number>();
      prevQuestions.forEach((q, index) => {
        existingQuestionIdMap.set(q.question.id, index);
      });
      const newQuestionObjects: {
        question: Question;
        isDeleted: boolean;
        isAdded: boolean;
        index: number;
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
            index: updatedPrevQuestions.length,
          });
        }
      });
      return [...updatedPrevQuestions, ...newQuestionObjects];
    });
    setIsLoading(true);
    setIsAddQuestionModalOpen(false);
    setIsLoading(false);
  };

  const handleDelete = () => {
    const itemsToDelete = Array.from(selectedQuestions ?? []).map((item) =>
      parseInt(item as string, 10),
    );
    setPart1Questions((prevQuestions) =>
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
    setPart1Questions(
      part1Questions.map((question) =>
        selectedIdsToAdd.includes(question.question.id)
          ? { ...question, isDeleted: false }
          : question,
      ),
    );
  };

  const [selectedQuestions, setSelectedQuestions] = useState<
    "all" | Iterable<Key> | undefined
  >(undefined);

  const [pageSequenceId, setPageSequenceId] = useState<string | null>(null);

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 3 && pathParts[2] === "sequences") {
      setPageSequenceId(pathParts[3]);
    } else {
      setPageSequenceId(null);
    }
  }, [pathname]);

  const handleGoSequences = () => {
    if (pageSequenceId) {
      router.push("/db/sequences");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen w-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
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
            <div
              onClick={handleGoSequences}
              className="text-2xl font-bold cursor-pointer"
            >
              Sekwencje
            </div>
            {pageSequenceId && (
              <span className="text-2xl font-bold text-gray-500">
                / Sekwencja ID{pageSequenceId}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            {pageSequenceId === null && (
              <Button
                variant="flat"
                color="primary"
                onPress={() => setShowCreateSequenceModal(true)}
              >
                Dodaj sekwencję
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl max-h-[calc(100vh-96px)] overflow-y-scroll">
        <div className="flex flex-col gap-4 w-full items-center justify-center">
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
                <Button
                  variant="flat"
                  color="default"
                  onPress={handleCancelEdit}
                >
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
                  {part1Questions.map((question) => (
                    <TableRow
                      key={question.question.id}
                      className={
                        question.isDeleted
                          ? "bg-red-700 bg-opacity-10 text-red-500"
                          : ""
                      }
                    >
                      <TableCell>{question.index}</TableCell>
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
                      !part1Questions.some(
                        (question) =>
                          question.question.id ===
                          parseInt(selectedQuestionId as string, 10),
                      ),
                  ) ? (
                    <Button
                      variant="flat"
                      color="primary"
                      onPress={handleRecover}
                    >
                      <PlusIcon size={16} />
                      Przywróć pytania
                    </Button>
                  ) : (
                    <Button
                      variant="flat"
                      color="danger"
                      onPress={handleDelete}
                    >
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
            includedQuestionIds={part1Questions
              .filter((question) => !question.isDeleted)
              .map((question) => question.question.id)}
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
          <CreateSequenceModal
            isOpen={showCreateSequenceModal}
            onClose={() => setShowCreateSequenceModal(false)}
          />
          <LoadingDialog isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
