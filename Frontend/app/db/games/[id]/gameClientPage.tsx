"use client";

import { getGameById, updateGame } from "@/app/actions/game";
import AddPlayerToGameModal from "@/app/components/addPlayerToGameModal";
import LoadingDialog from "@/app/components/loadingDialog";
import SelectPlayerSeatModal from "@/app/components/selectPlayerSeatModal";
import { SequencePart } from "@/app/enums/sequencePart";
import { Game } from "@/app/models/Game";
import { GamePlayer } from "@/app/models/GamePlayer";
import { Player } from "@/app/models/Player";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Tooltip,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  addToast,
} from "@heroui/react";
import { ArrowUp10, EllipsisIcon, HomeIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function GameClientPage({ gameId }: { gameId: number }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [originalGame, setOriginalGame] = useState<Game | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [hasBeenChanged, setHasBeenChanged] = useState(false);

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [handleDeletePlayerId, setHandleDeletePlayerId] = useState<
    number | null
  >(null);

  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);
  const [showAddPlayerToGameModal, setShowAddPlayerToGameModal] =
    useState(false);

  const handleFetchGame = useCallback(async () => {
    setIsLoading(true);
    const result = await getGameById(gameId);
    if (result.isSuccess && result.game) {
      setGame(result.game);
      setOriginalGame(result.game);
    }
    setIsLoading(false);
  }, [gameId]);

  useEffect(() => {
    handleFetchGame();
  }, [handleFetchGame]);

  const handleGoGames = () => {
    router.push("/db/games");
  };

  const handleChangePlayerSeat = (newSeat: number) => {
    setHasBeenChanged(true);
    if (selectedPlayerId === null) {
      return;
    }

    setHasBeenChanged(true);
    setGame((prev) => {
      if (prev === null) {
        return null;
      }

      return {
        ...prev,
        players: prev.players.map((p) =>
          p.id === selectedPlayerId ? { ...p, seat: newSeat } : p,
        ),
      };
    });
    setSelectedPlayerId(null);
  };

  const handleAddPlayerToGame = (player: Player, seat: number) => {
    setHasBeenChanged(true);
    if (game?.players.find((p) => p.id === player.id)) {
      addToast({
        title: "Błąd",
        description: "Gracz już istnieje w grze",
        color: "danger",
      });
      return;
    }
    setGame((prev) => {
      if (prev === null) {
        return null;
      }

      const newPlayer: GamePlayer = {
        ...player,
        seat,
        gameId: prev.id,
        playerId: player.id,
        points: 0,
        lives: 3,
        actions: [],
      };

      return {
        ...prev,
        players: [...prev.players, newPlayer],
      };
    });
  };

  const handleDeletePlayer = (playerId: number) => {
    setHasBeenChanged(true);
    setHandleDeletePlayerId(null);
    setGame((prev) => {
      if (prev === null) {
        return null;
      }

      return {
        ...prev,
        players: prev.players.filter((p) => p.id !== playerId),
      };
    });
  };

  const handleDiscardChanges = () => {
    setGame(originalGame);
    setHasBeenChanged(false);
    setShowDiscardChangesModal(false);
  };

  const handleSaveChanges = async () => {
    const players = game?.players.map((p) => ({
      playerId: p.playerId,
      seat: p.seat,
    }));
    if (players === null) {
      return;
    }
    setIsLoading(true);
    const result = await updateGame(gameId, game?.sequence.id, players);
    console.log(result);
    if (!result.isSuccess) {
      addToast({
        title: "Błąd",
        description: result.message,
        color: "danger",
      });
      setHasBeenChanged(false);
      setShowDiscardChangesModal(false);
    } else {
      addToast({
        title: "Sukces",
        description: "Zmiany zapisane",
        color: "success",
      });
    }
    setIsLoading(false);
    setShowAddPlayerToGameModal(false);
    setHasBeenChanged(false);
    await handleFetchGame();
  };

  const pageGameId = gameId;

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="default"
              onPress={() => router.push("/")}
              isIconOnly
            >
              <HomeIcon />
            </Button>
            <div
              onClick={handleGoGames}
              className="text-2xl font-bold cursor-pointer"
            >
              Gry
            </div>
            {pageGameId && (
              <span className="text-2xl font-bold text-gray-500">
                / {game?.name ?? "Brak nazwy"}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            {pageGameId === null && (
              <Button
                variant="flat"
                color="primary"
                onPress={() => console.log("create")}
              >
                Dodaj sekwencję
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl max-h-[calc(100vh-96px)] overflow-y-scroll gap-4">
        <Card className="w-full min-h-[128px]">
          <CardBody>
            <div className="text-2xl font-bold">Sekwencja</div>
          </CardBody>
          <Divider />
          <CardBody>
            <div className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-2">
                <span className="text-gray-400">Nazwa:</span>{" "}
                <Tooltip content="Przejdź do sekwencji">
                  <Link
                    href={`/db/sequences/${game?.sequence.id}`}
                    className="text-blue-500 hover:text-blue-600 text-2xl"
                  >
                    {game?.sequence.name ?? "-"}
                  </Link>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="text-gray-400">
                Pierwsza część:{" "}
                {
                  game?.sequence.questions.filter(
                    (q) => q.sequencePart === SequencePart.Part1,
                  ).length
                }{" "}
                pytań
              </div>
              <Divider orientation="vertical" />
              <div className="text-gray-400">
                Druga część:{" "}
                {
                  game?.sequence.questions.filter(
                    (q) => q.sequencePart === SequencePart.Part2,
                  ).length
                }{" "}
                pytań
              </div>
              <Divider orientation="vertical" />
              <div className="text-gray-400">
                Trzecia część:{" "}
                {
                  game?.sequence.questions.filter(
                    (q) => q.sequencePart === SequencePart.Part3,
                  ).length
                }{" "}
                pytań
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="w-full">
          <CardBody className="h-20 flex flex-row items-center justify-between">
            <div className="text-2xl font-bold">Gracze</div>
            <div className="flex flex-row items-center justify-end">
              <Button
                variant="flat"
                color="primary"
                onPress={() => setShowAddPlayerToGameModal(true)}
                isDisabled={(game?.players.length ?? 0) >= 10}
              >
                Dodaj gracza
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardBody className="overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-2">
              {game?.players
                .sort((a, b) => a.seat - b.seat)
                .map((player) => (
                  <Card key={player.id} className="w-full">
                    <CardBody className="h-auto bg-white/5 flex flex-row items-center justify-between">
                      <div className="flex flex- items-center justify-start gap-2">
                        <Avatar
                          style={{ backgroundColor: player.color }}
                          name={player.name.charAt(0)}
                        />
                        <div className="flex flex-col items-start justify-center">
                          <div className="text-2xl font-bold">
                            {player.name} {player.playerId}
                          </div>
                          <div className="text-gray-400">
                            Stanowisko: {player.seat}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center gap-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button variant="light" isIconOnly>
                              <EllipsisIcon />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              key="edit"
                              startContent={<ArrowUp10 />}
                              showDivider
                              onPress={() => setSelectedPlayerId(player.id)}
                            >
                              Zmień stanowisko
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              startContent={<TrashIcon />}
                              color="danger"
                              onPress={() => setHandleDeletePlayerId(player.id)}
                            >
                              Usuń z gry
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <SelectPlayerSeatModal
        isOpen={selectedPlayerId !== null}
        onClose={() => setSelectedPlayerId(null)}
        onSelect={handleChangePlayerSeat}
        assignedPlayers={
          game?.players.map((p) => ({
            seat: p.seat,
            player: p.name,
          })) ?? []
        }
        selectedPlayer={
          game?.players.find((p) => p.id === selectedPlayerId) ?? null
        }
      />
      <Modal
        isOpen={handleDeletePlayerId !== null}
        onClose={() => setHandleDeletePlayerId(null)}
      >
        <ModalContent>
          <ModalHeader>Czy napewno chcesz usunąć gracza z gry?</ModalHeader>
          <ModalBody>
            <Button
              onPress={() => setHandleDeletePlayerId(null)}
              color="primary"
            >
              Anuluj
            </Button>
            <Button
              color="danger"
              onPress={() => handleDeletePlayer(handleDeletePlayerId ?? 0)}
            >
              Usuń
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {hasBeenChanged && (
        <Card className="fixed bottom-4">
          <CardBody className="flex flex-row items-center justify-center gap-2">
            Zostały wprowadzone zmiany, czy chcesz je zapisać?
            <Button
              variant="flat"
              color="warning"
              onPress={() => setShowDiscardChangesModal(true)}
            >
              Przywróć
            </Button>
            <Button
              variant="flat"
              color="success"
              onPress={handleSaveChanges}
              isDisabled={game?.players.length !== 10}
            >
              Zapisz
            </Button>
          </CardBody>
        </Card>
      )}
      <Modal
        isOpen={showDiscardChangesModal}
        onClose={() => setShowDiscardChangesModal(false)}
      >
        <ModalContent>
          <ModalHeader>Czy napewno chcesz porzucić zmiany?</ModalHeader>
          <ModalBody>
            <Button
              variant="flat"
              color="danger"
              onPress={handleDiscardChanges}
            >
              Porzuc zmiany
            </Button>
            <Button variant="flat" color="primary">
              Anuluj
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AddPlayerToGameModal
        isOpen={showAddPlayerToGameModal}
        onClose={() => setShowAddPlayerToGameModal(false)}
        onSelect={handleAddPlayerToGame}
        assignedPlayers={
          game?.players.map((p) => ({
            seat: p.seat,
            player: p.name,
          })) ?? []
        }
      />
      <LoadingDialog isLoading={isLoading} />
    </div>
  );
}
