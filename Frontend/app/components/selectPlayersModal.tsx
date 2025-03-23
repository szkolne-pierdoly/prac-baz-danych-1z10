"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  addToast,
  Card,
  CardBody,
  Divider,
  Button,
  ModalFooter,
  Spinner,
} from "@heroui/react";
import { Player } from "../models/Player";
import { useState, useEffect } from "react";
import { getPlayers } from "../actions/player";

export default function SelectPlayersModal({
  isOpen,
  onClose,
  onSuccess,
  alreadySelectedPlayers,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (players: Player[]) => void;
  alreadySelectedPlayers: number[];
}) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchPlayers = async () => {
    const result = await getPlayers();
    if (result.isSuccess && result.players) {
      setPlayers(result.players);
    } else {
      addToast({
        title: "Błąd",
        description: result.message,
        color: "danger",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      handleFetchPlayers().finally(() => setIsLoading(false));
      setSelectedPlayers(alreadySelectedPlayers ?? []);
    } else {
      setPlayers([]);
      setSelectedPlayers([]);
    }
  }, [isOpen]);

  const handleSave = () => {
    onSuccess(players.filter((player) => selectedPlayers.includes(player.id)));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" className="h-[600px]">
      <ModalContent className="relative">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/50">
            <Spinner />
          </div>
        )}
        <ModalHeader>Wybierz graczy</ModalHeader>
        <Divider />
        <ModalBody className="overflow-y-auto">
          <div className="flex flex-row gap-3 flex-wrap">
            {players.map((player) => (
              <Card
                key={player.id}
                className={`w-full max-w-[calc(33%-0.37rem)] aspect-square transition-all duration-300 ${
                  selectedPlayers.includes(player.id)
                    ? "outline outline-2 outline-primary"
                    : "outline outline-0 outline-transparent"
                }`}
                isHoverable
                isPressable
                onPress={() => {
                  setSelectedPlayers((prev) =>
                    prev.includes(player.id)
                      ? prev.filter((id) => id !== player.id)
                      : [...prev, player.id],
                  );
                }}
              >
                <CardBody
                  className={`flex flex-col items-center justify-center ${
                    selectedPlayers.includes(player.id)
                      ? "bg-primary/10"
                      : "bg-white/5"
                  }`}
                >
                  <div className="text-lg font-bold">{player.name}</div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter className="flex flex-row gap-3 justify-between">
          <Button
            className="w-1/4"
            color="secondary"
            variant="flat"
            onPress={onClose}
          >
            Zamknij
          </Button>
          <Button
            className="w-1/4"
            color="primary"
            variant="flat"
            onPress={handleSave}
          >
            Zapisz
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
