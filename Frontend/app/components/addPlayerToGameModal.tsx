"use client";

import {
  addToast,
  Avatar,
  Card,
  CardBody,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
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
  onSelect: (player: Player) => void;
  selectedPlayersIds: number[] | null;
}) {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleFetchPlayers = async () => {
    const result = await getPlayers();
    if (result.isSuccess && result.players) {
      setPlayers(result.players);
    } else {
      addToast({
        title: "Error",
        description: result.message,
        color: "danger",
      });
    }
  };

  useEffect(() => {
    console.log("selected", selectedPlayersIds);
    if (isOpen) {
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
                className="flex flex-row gap-2"
                isPressable
                isHoverable
                onPress={() => {
                  onSelect(player);
                }}
              >
                <CardBody className="flex flex-row gap-2 items-center justify-start bg-white/5">
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
      </ModalContent>
    </Modal>
  );
}
