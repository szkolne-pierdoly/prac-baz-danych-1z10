"use client";

import {
  addToast,
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Player } from "../models/Player";
import { useEffect, useState } from "react";
import { getPlayers } from "../actions/player";
export default function AddPlayerToGameModal({
  isOpen,
  onClose,
  onSelect,
  selectedPlayersIds,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (players: Player[]) => void;
  selectedPlayersIds: number[] | null;
}) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);

  const handleFetchPlayers = async () => {
    const result = await getPlayers();
    if (result.isSuccess && result.players) {
      setPlayers(result.players);
      setSelectedPlayers(selectedPlayersIds ?? []);
      console.log(selectedPlayers);
    } else {
      addToast({
        title: "Error",
        description: result.message,
        color: "danger",
      });
    }
  };

  useEffect(() => {
    handleFetchPlayers();
  }, []);

  useEffect(() => {
    console.log("selected", selectedPlayersIds);
    if (!isOpen) {
      setSelectedPlayers([]);
      setPlayers([]);
    } else {
      handleFetchPlayers();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Dodaj gracza</ModalHeader>
        <Divider />
        <ModalBody className="max-h-[50vh] overflow-y-auto">
          <div className="flex flex-col gap-4 my-4">
            {players.map((player) => (
              <Card
                key={player.id}
                className={`flex flex-row gap-2 ${
                  selectedPlayers.includes(player.id)
                    ? "outline outline-2 outline-primary outline-offset-2"
                    : ""
                }`}
                isPressable
                isHoverable
                onPress={() => {
                  if (selectedPlayers.includes(player.id)) {
                    setSelectedPlayers(
                      selectedPlayers.filter((p) => p !== player.id),
                    );
                  } else {
                    setSelectedPlayers([...selectedPlayers, player.id]);
                  }
                }}
              >
                <CardBody
                  className={`flex flex-row gap-2 items-center justify-start ${
                    selectedPlayers.includes(player.id)
                      ? "bg-white/15"
                      : "bg-white/5"
                  }`}
                >
                  <Avatar
                    style={{ backgroundColor: player.color }}
                    name={player.name.charAt(0).toUpperCase()}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0">
                      <p className="text-xl font-bold">{player.name}</p>
                      <p className="text-sm text-gray-500">ID: {player.id}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
        <Divider />
        <ModalFooter className="flex flex-row items-center gap-4">
          <Button variant="flat" onPress={onClose}>
            Anuluj
          </Button>
          <Button
            variant="solid"
            color="primary"
            fullWidth
            isDisabled={
              selectedPlayers === null ||
              selectedPlayers.length === 0 ||
              selectedPlayers.length > 10
            }
            onPress={() => {
              if (selectedPlayers) {
                onSelect(
                  players.filter((player) =>
                    selectedPlayers.includes(player.id),
                  ),
                );
              }
            }}
          >
            Dodaj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
