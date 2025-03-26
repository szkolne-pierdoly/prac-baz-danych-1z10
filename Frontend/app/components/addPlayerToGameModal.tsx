"use client";

import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { Player } from "../models/Player";

export default function AddPlayerToGameModal({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (player: Player) => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Dodaj gracza</ModalHeader>
        <Divider />
        <ModalBody>Select player here...</ModalBody>
      </ModalContent>
    </Modal>
  );
}
