"use client";

import { Button, Card, Divider, ModalFooter, CardBody } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { Player } from "../models/Player";

export default function SelectPlayerSeatModal({
  isOpen,
  onClose,
  onSelect,
  assignedPlayers,
  selectedPlayer,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (seat: number) => void;
  assignedPlayers: {
    seat: number;
    player: string;
  }[];
  selectedPlayer: Player | null;
}) {
  const [seat, setSeat] = useState<number>(0);

  useEffect(() => {
    console.log(seat);
  }, [seat]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>
          Wybierz miejsce dla gracza (stanowisko, ekran)
        </ModalHeader>
        <Divider />
        <ModalBody className="overflow-y-auto max-h-[200px]">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card
              key={index}
              isPressable
              isDisabled={!!assignedPlayers.find((p) => p.seat === index + 1)}
              className={`min-h-12 ${seat === index + 1 ? "outline outline-primary outline-2 outline-offset-2" : "bg-white/5"}`}
              isHoverable
              onPress={() => setSeat(seat === index + 1 ? 0 : index + 1)}
            >
              <CardBody
                className={`h-full flex flex-row items-start justify-between ${
                  seat === index + 1 ? "bg-primary-400/15" : "bg-white/5"
                }`}
              >
                <div>Stanowisko {index + 1}</div>
                {assignedPlayers.find((p) => p.seat === index + 1) ? (
                  <div className="flex flex-col gap-1">
                    <div className="text-red-500">
                      {assignedPlayers.find((p) => p.seat === index + 1)
                        ?.player === selectedPlayer?.name
                        ? "Aktualnie wybrane"
                        : "Zajęte przez " +
                          assignedPlayers.find((p) => p.seat === index + 1)
                            ?.player}
                    </div>
                  </div>
                ) : (
                  <div className="text-green-500">Dostępne</div>
                )}
              </CardBody>
            </Card>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} variant="flat" color="secondary" fullWidth>
            Anuluj
          </Button>
          <Button
            onPress={() => onSelect(seat)}
            variant="solid"
            color="primary"
            fullWidth
            isDisabled={!!assignedPlayers.find((p) => p.seat === seat)}
          >
            Wybierz
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
