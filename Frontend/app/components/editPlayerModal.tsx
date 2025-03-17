"use client";

import { Avatar, Button, Divider, Input, Modal, ModalBody, ModalCModalFooter, ontent, ModalHeader, ModalContent, ModalFooter } from "@heroui/react";
import { Player } from "../models/Player";
import { useEffect, useState } from "react";
import { updatePlayer } from "../actions/player";

export default function EditPlayerModal({
  player,
  isOpen,
  onClose,
  onSuccess,
}: {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(player?.name);
  const [color, setColor] = useState(player?.color);
  const [nameError, setNameError] = useState(false);
  const [colorError, setColorError] = useState(false);

  useEffect(() => {
    setName(player?.name);
    setColor(player?.color);
  }, [player]);

  const handleClose = () => {
    setName("");
    setColor("");
    onClose();
  };

  const handleSave = () => {
    if (!name || name == "") {
      setNameError(true);
      return;
    }
    if (
      !color ||
      color == "" ||
      !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
    ) {
      setColorError(true);
      return;
    }
    if (!player?.id) {
      onClose();
      return;
    }

    setNameError(false);
    setColorError(false);

    updatePlayer(player.id, name, color).then((res) => {
      if (res.isSuccess) {
        onSuccess();
        onClose();
      } else {
        setNameError(true);
        setColorError(true);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edytuj gracza</ModalHeader>
        <Divider />
        <ModalBody className="flex flex-row items-center justify-start">
          <Avatar
            name={name?.charAt(0)}
            size="lg"
            style={{ backgroundColor: color }}
          />
          <div className="flex flex-col items-start justify-start">
            <div className="text-2xl font-bold">{name}</div>
          </div>
        </ModalBody>
        <Divider />
        <ModalBody>
          <Input
            label="Nazwa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={nameError}
          />
          <Input
            label="Kolor"
            value={color}
            onChange={(e) => {
              let hexColor = e.target.value.toUpperCase();
              if (!hexColor.startsWith("#")) {
                hexColor = "#" + hexColor;
              }
              if (hexColor.startsWith("##")) {
                hexColor = hexColor.replace("##", "#");
              }
              hexColor = hexColor.replace(/[^#0-9A-F]/g, "");
              if (hexColor.length > 7) {
                hexColor = hexColor.slice(0, 7);
              }
              setColor(hexColor);
            }}
            isInvalid={colorError}
          />
        </ModalBody>
        <ModalFooter>
          <Button onPress={handleClose} variant="flat" color="danger">
            Anuluj
          </Button>
          <Button
            onPress={handleSave}
            className="w-full"
            color="primary"
            variant="flat"
          >
            Zapisz
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}