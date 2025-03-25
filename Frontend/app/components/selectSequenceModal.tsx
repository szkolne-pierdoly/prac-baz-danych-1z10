"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Divider,
  addToast,
  Button,
} from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Sequence } from "@/app/models/Sequence";
import { getAllSequences, getSequence, getSequences } from "../actions/sequence";

export default function SelectSequenceModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (sequence: string) => void;
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
        <ModalBody>
          <div className="flex flex-col gap-2">
            {sequences.map((sequence) => (
              <div key={sequence.id}>{sequence.name}</div>
            ))}
            {sequences.length < totalItems && (
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
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
