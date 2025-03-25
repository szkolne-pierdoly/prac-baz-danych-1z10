"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Divider,
  addToast,
  Button,
  Card,
  CardBody,
} from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Sequence } from "@/app/models/Sequence";
import { getSequences } from "../actions/sequence";

export default function SelectSequenceModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sequence: Sequence) => void;
}) {
  const [searchName, setSearchName] = useState("");
  const [sequences, setSequences] = useState<Sequence[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const handleFetchSequences = async () => {
    setIsLoading(true);
    const result = await getSequences(true, searchName, 1, 10);
    setIsLoading(false);
    if (result.isSuccess) {
      setSequences(result.sequences ?? []);
      setTotalItems(result.totalItems ?? 0);
      console.log(result.sequences);
    } else {
      addToast({
        title: "Błąd",
        description: result.message,
        color: "danger",
      });
    }
  };

  const handleLoadMoreSequences = async () => {
    if (sequences.length >= totalItems) {
      return;
    }
    setIsLoading(true);
    const currentPage = Math.floor(sequences.length / 10) + 1;
    const result = await getSequences(true, searchName, currentPage, 10);
    setIsLoading(false);
    if (result.isSuccess) {
      setSequences((prevSequences) => [
        ...prevSequences,
        ...(result.sequences ?? []),
      ]);
      setTotalItems(result.totalItems ?? 0);
    } else {
      addToast({
        title: "Błąd",
        description: result.message,
        color: "danger",
      });
    }
  };

  useEffect(() => {
    handleFetchSequences();
  }, [searchName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-row items-center justify-between mr-4">
          Wybierz sekwencję
          <Input
            placeholder="Szukaj sekwencji"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="max-w-48"
            startContent={<SearchIcon />}
          />
        </ModalHeader>
        <Divider />
        <ModalBody className="max-h-[24rem] overflow-y-auto">
          <div className="flex flex-col gap-2 max-h-[32rem]">
            {sequences.map((sequence) => (
              <Card
                className="w-full"
                key={sequence.id}
                isPressable
                isHoverable
                onPress={() => onSelect(sequence)}
              >
                <CardBody className="bg-white/5">
                  <div className="flex flex-col items-start justify-between">
                    <p className="text-lg font-bold">{sequence.name}</p>
                    <div className="flex flex-row items-center justify-start gap-2 h-5">
                      <p className="text-sm text-gray-500">
                        pierwsza część:{" "}
                        {
                          sequence.questions.filter(
                            (question) => question.sequencePart === 0,
                          ).length
                        }{" "}
                        pytań
                      </p>
                      <Divider orientation="vertical" />
                      <p className="text-sm text-gray-500">
                        druga część:{" "}
                        {
                          sequence.questions.filter(
                            (question) => question.sequencePart === 1,
                          ).length
                        }{" "}
                        pytań
                      </p>
                      <Divider orientation="vertical" />
                      <p className="text-sm text-gray-500">
                        trzecia część:{" "}
                        {
                          sequence.questions.filter(
                            (question) => question.sequencePart === 2,
                          ).length
                        }{" "}
                        pytań
                      </p>
                    </div>
                    {searchName != "" && !isLoading && (
                      <div className="mt-2 flex flex-col gap-0">
                        {sequence.questions
                          .filter((question) =>
                            question.question.content
                              .toLowerCase()
                              .includes(searchName.toLowerCase()),
                          )
                          .slice(0, 3)
                          .map((question) => (
                            <p key={question.id} className="text-sm text-white">
                              {question.sequencePart + 1}.{question.order}.{" "}
                              {question.question.content}
                            </p>
                          ))}
                        {sequence.questions.filter((question) =>
                          question.question.content
                            .toLowerCase()
                            .includes(searchName.toLowerCase()),
                        ).length > 3 && (
                          <p className="text-sm text-white">
                            ... i{" "}
                            {sequence.questions.filter((question) =>
                              question.question.content
                                .toLowerCase()
                                .includes(searchName.toLowerCase()),
                            ).length - 3}{" "}
                            więcej
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
            {sequences.length < totalItems ? (
              <div className="flex flex-row justify-center mt-4">
                <Button
                  onPress={handleLoadMoreSequences}
                  isLoading={isLoading && sequences.length > 0}
                  isDisabled={sequences.length >= totalItems}
                  className="px-8"
                  variant="flat"
                  color="secondary"
                >
                  Załaduj więcej
                </Button>
              </div>
            ) : (
              <div className="flex flex-row justify-center my-4">
                <p className="text-sm text-gray-500">
                  Wyświetlasz wszystkie {totalItems} z {totalItems} sekwencji
                </p>
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
