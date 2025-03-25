"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
} from "@heroui/react";

export default function SelectSequenceModal() {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>Wybierz sekwencję</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <Input label="Nazwa sekwencji" />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
