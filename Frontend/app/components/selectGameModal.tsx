"use client";

import {
  addToast,
  Card,
  CardBody,
  Divider,
  Input,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { Modal } from "@heroui/react";
import { Game } from "../models/Game";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getGames } from "../actions/game";
export default function SelectGameModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (game: Game) => void;
}) {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");

  const handleFetchGames = useCallback(async () => {
    const limit = 10;
    const offset = games.length;
    const result = await getGames(
      search ? limit : undefined,
      search ? offset : undefined,
      search || undefined,
    );
    if (result.isSuccess) {
      setGames(result.games ?? []);
    } else {
      addToast({
        title: "Błąd",
        description: "Nie udało się pobrać gier",
        color: "danger",
      });
    }
  }, [search, games.length]);

  useEffect(() => {
    if (isOpen) {
      handleFetchGames();
    } else {
      setGames([]);
    }
  }, [isOpen, search, handleFetchGames]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <ModalHeader className="flex justify-between items-center mr-4">
          Wybierz grę
          <Input
            placeholder="Wyszukaj grę"
            variant="bordered"
            className="max-w-xs"
            startContent={<SearchIcon />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </ModalHeader>
        <Divider />
        <ModalBody className="max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {games.map((game) => (
              <Card
                key={game.id}
                isHoverable
                isPressable
                onPress={() => onSelect(game)}
              >
                <CardBody className="font-bold bg-white/5">
                  {game.name ?? "Gra bez nazwy"}
                  <div className="text-sm text-gray-500">
                    Sekwencja: {game.sequence.name}, Utworzona:{" "}
                    {new Date(game.createdAt).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
