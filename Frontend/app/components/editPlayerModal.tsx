"use client";

import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@heroui/react";
import { Player } from "../models/Player";
import { useEffect, useState } from "react";
import { deletePlayer, updatePlayer } from "../actions/player";

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
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  useEffect(() => {
    setName(player?.name);
    setColor(player?.color);
  }, [player]);

  const handleDelete = () => {
    if (!player?.id) {
      return;
    }
    deletePlayer(player.id).then((res) => {
      if (res.isSuccess) {
        setIsDeleteConfirm(false);
        setName("");
        setColor("");
        onSuccess();
        onClose();
      }
    });
  };

  const handleClose = () => {
    setName("");
    setColor("");
    onClose();
    setIsDeleteConfirm(false);
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
    <Modal isOpen={isOpen} onClose={handleClose}>
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
            <div>
              <div className="text-2xl font-bold">{name}</div>
              <div className="text-gray-400 text-sm">ID: {player?.id}</div>
            </div>
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
        <Divider />
        <ModalFooter className="flex flex-row items-center justify-center">
          <Button
            variant="light"
            color="danger"
            onPress={() => setIsDeleteConfirm(true)}
          >
            Usuń gracza
          </Button>
        </ModalFooter>
      </ModalContent>
      <Modal
        isOpen={isDeleteConfirm && isOpen}
        onClose={() => setIsDeleteConfirm(false)}
        size="lg"
      >
        <ModalContent>
          <ModalHeader>Usuń gracza</ModalHeader>
          <Divider />
          <ModalBody>
            <div>Czy na pewno chcesz usunąć tego gracza permanentnie?</div>
            <div>
              <Button
                variant="flat"
                color="danger"
                onPress={handleDelete}
                className="w-full"
              >
                Usuń gracza
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Modal>
  );
}
