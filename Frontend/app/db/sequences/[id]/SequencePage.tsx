"use client";

import { Sequence } from "@/app/models/Sequence";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon, HomeIcon, MenuIcon, MoreVerticalIcon } from "lucide-react";
import { Question } from "@/app/models/Question";
import AddQuestionModal from "@/app/components/addQuestionModal";
import { useRouter, usePathname } from "next/navigation";
import { Key } from "@react-types/shared";
import {
  deleteSequence,
  updateSequence,
  getSequence as getSequenceAction,
  getSequenceQuestions,
  getSequenceQuestionsPart,
} from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import CreateSequenceModal from "@/app/components/createSequenceModal";
import SequenceQuestionsPart1 from "@/app/components/sequenceQuestionsPart1";

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
  const [selectedTab, setSelectedTab] = useState<string>("part1");

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
    getSequenceQuestions(sequenceId, 1).then((data) => {
      console.log(data);
    });

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

  const handleDeleteSequence = async () => {
    if (sequence) {
      const result = await deleteSequence(sequence.id);
      if (result.isSuccess) {
        router.push("/db/sequences");
      }
    }
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
          <Card className="w-full max-h-[calc(100vh-160px)] overflow-y-scroll">
            <CardBody className="flex flex-row justify-between items-center min-h-[64px]">
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
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" color="default" isIconOnly>
                    <MoreVerticalIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="rename"
                    startContent={<PencilIcon />}
                    onPress={handleEdit}
                  >
                    Zmień nazwę
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    startContent={<TrashIcon />}
                    color="danger"
                    onPress={() => setIsDeleteSequenceModalOpen(true)}
                  >
                    Usuń
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
            <Divider />
            <CardBody className="flex flex-col gap-2">
              <Tabs
                fullWidth
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as string)}
              >
                <Tab key="part1" title="Pierwsza część" />
                <Tab key="part2" title="Druga część" />
                <Tab key="part3" title="Trzecia część" />
              </Tabs>
              {selectedTab === "part1" && (
                <SequenceQuestionsPart1 sequenceId={sequenceId} />
              )}
            </CardBody>
          </Card>
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
      </div>
    </div>
  );
}
