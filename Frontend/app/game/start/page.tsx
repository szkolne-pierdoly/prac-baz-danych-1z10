"use client";

import { Game } from "@/app/models/Game";
import { useEffect, useState } from "react";
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
import { duplicateGame, getGameById } from "@/app/actions/game";

export default function StartGamePage() {
  const [game, setGame] = useState<Game | null>(null);
  const [duplicatedGameId, setDuplicatedGameId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isGameValid, setIsGameValid] = useState<boolean>(false);

  const [showsSelectGameModal, setShowsSelectGameModal] = useState(false);
  const [showDuplicatedSuccessModal, setShowDuplicatedSuccessModal] =
    useState(false);
  const [gameValidationMessages, setGameValidationMessages] = useState<
    string[]
  >([]);

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

  const handleStartGame = () => {
    console.log(game);
    if (game === null) {
      addToast({
        title: "Nie wybrano gry",
        description: "Wybierz grę, którą chcesz rozpocząć",
        color: "danger",
      });
      return;
    }
    if (game.players.length !== 10) {
      addToast({
        title: "Niepoprawna ilość graczy",
        description: "W grze musi być dokładnie 10 graczy",
        color: "danger",
      });
      return;
    }
    if (
      game.players.some((player) => player.seat < 1 || player.seat > 10) ||
      new Set(game.players.map((player) => player.seat)).size !== 10
    ) {
      addToast({
        title: "Gracze niepoprawnie przypisani do monitorów",
        description:
          "Sprawdź, czy każdy gracz ma przypisany dokładnie jeden monitor oraz czy wszystkie monitory są zajęte",
        color: "danger",
      });
      return;
    }
    if (game.sequence === null) {
      addToast({
        title: "Nie wybrano sekwencji",
        description: "Wybierz sekwencję, którą chcesz rozpocząć",
        color: "danger",
      });
      return;
    }
    if (
      game.sequence.questions.filter((q) => q.part == 0).length !== 20 ||
      game.sequence.questions.filter((q) => q.part == 1).length === 0 ||
      game.sequence.questions.filter((q) => q.part == 2).length === 0
    ) {
      addToast({
        title: "Niepoprawna ilość pytań",
        description:
          "Pierwsza część musi zawierać dokładnie 20 pytań, druga i trzecia sekwencja nie może być pusta",
        color: "danger",
      });
      return;
    }

    addToast({
      title: "Gratulacje!",
      description: "Gry można rozpocząć",
      color: "success",
    });
  };

  const handleGetGame = async (id: number) => {
    const result = await getGameById(id);
    if (!result.isSuccess || !result.game) {
      addToast({
        title: "Coś poszło nie tak...",
        description: result.message,
        color: "danger",
      });
      return;
    }
    setGame(result.game);
  };

  useEffect(() => {
    const validateGame = () => {
      const messages: string[] = [];

      if (!game) {
        setIsGameValid(false);
        return;
      }

      // Validate players
      if (game.players.length !== 10) {
        messages.push("Gra musi zawierać dokładnie 10 graczy.");
      }

      // Validate seats
      if (game.players.some((player) => player.seat < 1 || player.seat > 10)) {
        messages.push(
          "Numery monitorów graczy muszą być w zakresie od 1 do 10.",
        );
      }
      if (new Set(game.players.map((player) => player.seat)).size !== 10) {
        messages.push("Numery monitorów graczy muszą być unikalne.");
      }

      // Validate unique players
      const uniquePlayerIds = new Set(game.players.map((p) => p.playerId));
      if (uniquePlayerIds.size !== 10) {
        messages.push("Gracze muszą być unikalni.");
      }

      // Validate sequence
      if (!game.sequence) {
        messages.push("Nie wybrano sekwencji.");
      } else {
        const part0Questions = game.sequence.questions.filter(
          (q) => q.part === 0,
        ).length;
        const part1Questions = game.sequence.questions.filter(
          (q) => q.part === 1,
        ).length;
        const part2Questions = game.sequence.questions.filter(
          (q) => q.part === 2,
        ).length;

        if (part0Questions !== 20) {
          messages.push(
            "Pierwsza część sekwencji musi zawierać dokładnie 20 pytań.",
          );
        }
        if (part1Questions === 0) {
          messages.push("Druga część sekwencji nie może być pusta.");
        }
        if (part2Questions === 0) {
          messages.push("Trzecia część sekwencji nie może być pusta.");
        }
      }

      setGameValidationMessages(messages);
      setIsGameValid(messages.length === 0);
    };

    setGameValidationMessages([]);
    validateGame();
  }, [game]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <Card className="w-96">
        <CardHeader>Rozpocznij grę</CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <div>
            Gra:{" "}
            {game ? (
              <Link href={`/db/games/${game.id}`} color="primary">
                {game.name ?? "Gra bez nazwy"}
              </Link>
            ) : (
              "Nie wybrano"
            )}
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
        {game !== null && !isGameValid && (
          <>
            <Divider />
            <CardBody className="flex flex-col gap-2">
              <div className="text-lg font-bold text-red-500">
                Wybrana gra jest niepoprawna:{" "}
              </div>
              <div className="flex flex-col gap-2 text-red-400">
                {gameValidationMessages.map((message) => (
                  <div key={message}>{message}</div>
                ))}
              </div>
            </CardBody>
          </>
        )}
        <Divider />
        <CardFooter>
          <Button
            fullWidth
            color="primary"
            isDisabled={game === null}
            onPress={handleStartGame}
          >
            Rozpocznij grę
          </Button>
        </CardFooter>
      </Card>
      <Link href="/" color="danger">
        Powrót do strony głównej
      </Link>
      <SelectGameModal
        isOpen={showsSelectGameModal}
        onClose={() => setShowsSelectGameModal(false)}
        onSelect={(game) => {
          handleGetGame(game.id);
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
