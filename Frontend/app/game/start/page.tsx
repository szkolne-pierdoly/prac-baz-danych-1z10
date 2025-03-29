"use client";

import { Game } from "@/app/models/Game";
import { useState } from "react";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalHeader,
  ModalContent,
  Tooltip,
  ModalBody,
  Link,
} from "@heroui/react";
import { PencilLineIcon } from "lucide-react";
import SelectGameModal from "@/app/components/selectGameModal";
import LoadingDialog from "@/app/components/loadingDialog";
import { deleteGame, duplicateGame } from "@/app/actions/game";

export default function StartGamePage() {
  const [game, setGame] = useState<Game | null>(null);
  const [duplicatedGameId, setDuplicatedGameId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showsSelectGameModal, setShowsSelectGameModal] = useState(false);
  const [showDuplicatedSuccessModal, setShowDuplicatedSuccessModal] =
    useState(false);

  const handleDuplicateGame = async (id: number) => {
    setIsLoading(true);
    const result = await duplicateGame(id);
    if (!result.isSuccess || !result.gameId) {
      addToast({
        title: "Coś poszło nie tak...",
        description: result.message,
        color: "danger",
      });
      setIsLoading(false);
      return;
    }

    setDuplicatedGameId(result.gameId);
    setShowDuplicatedSuccessModal(true);
    setIsLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <Card className="w-96">
        <CardHeader>Rozpocznij grę</CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <div>
            Gra: {game ? (game.name ?? "Gra bez nazwy") : "Nie wybrano"}
          </div>
          {game === null ? (
            <Button
              color="success"
              variant="flat"
              fullWidth
              onPress={() => setShowsSelectGameModal(true)}
            >
              Wybierz grę
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                color="secondary"
                variant="flat"
                fullWidth
                onPress={() => setShowsSelectGameModal(true)}
              >
                Zmień grę
              </Button>
              <Tooltip content="Duplikuj i edytuj">
                <Button
                  color="default"
                  variant="flat"
                  isIconOnly
                  onPress={() => handleDuplicateGame(game.id)}
                >
                  <PencilLineIcon />
                </Button>
              </Tooltip>
            </div>
          )}
        </CardBody>
        <Divider />
        <CardFooter>
          <Button fullWidth color="primary" isDisabled={game === null}>
            Rozpocznij grę
          </Button>
        </CardFooter>
      </Card>
      <Link href="/db/games" color="danger">
        Powrót do strony głównej
      </Link>
      <SelectGameModal
        isOpen={showsSelectGameModal}
        onClose={() => setShowsSelectGameModal(false)}
        onSelect={(game) => {
          setGame(game);
          setShowsSelectGameModal(false);
        }}
      />
      <LoadingDialog isLoading={isLoading} />
      <Modal
        isOpen={showDuplicatedSuccessModal}
        onClose={() => setShowDuplicatedSuccessModal(false)}
      >
        <ModalContent>
          <ModalHeader>Gra została skopiowana pomyślnie</ModalHeader>
          <ModalBody className="flex flex-row items-center justify-center mb-4">
            <Link
              href={`/db/games/${duplicatedGameId}`}
              color="primary"
              className="text-blue-500"
            >
              Przejdź do strony edycji
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
