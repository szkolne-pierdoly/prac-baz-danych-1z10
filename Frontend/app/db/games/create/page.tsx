"use client";

import { createGame } from "@/app/actions/game";
import AddPlayerToGameModal from "@/app/components/addPlayerToGameModal";
import SelectPlayerSeatModal from "@/app/components/selectPlayerSeatModal";
import SelectSequenceModal from "@/app/components/selectSequenceModal";
import { Player } from "@/app/models/Player";
import { Sequence } from "@/app/models/Sequence";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Input,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  addToast,
} from "@heroui/react";
import {
  ArrowUpDownIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  PlusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateGamePage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [players, setPlayers] = useState<{ player: Player; seat: number }[]>(
    [],
  );
  const [sequence, setSequence] = useState<Sequence | null>(null);

  const [showSelectSequence, setShowSelectSequence] = useState<boolean>(false);
  const [showAddPlayerToGame, setShowAddPlayerToGame] =
    useState<boolean>(false);
  const [showSelectPlayerSeat, setShowSelectPlayerSeat] =
    useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    console.log(players);
  }, [players]);

  const handleGoGames = () => {
    router.push("/db/games");
  };

  const handleSelectSequence = (sequence: Sequence) => {
    setSequence(sequence);
    setShowSelectSequence(false);
  };

  const handleRemovePlayer = (playerId: number) => {
    setPlayers(players.filter((player) => player.player.id !== playerId));
  };

  const handleAddPlayer = (player: Player, seat: number) => {
    setShowAddPlayerToGame(false);
    if (players.find((p) => p.player.id === player.id)) {
      addToast({
        title: "Błąd",
        description: "Gracz już jest w tej grze",
        color: "danger",
      });
    }
    setPlayers([...players, { player, seat }]);
  };

  const handleUpdatePlayerSeat = (seat: number) => {
    setShowSelectPlayerSeat(false);
    if (selectedPlayer == null) {
      addToast({
        title: "Błąd",
        description: "Nie wybrano gracza",
        color: "danger",
      });
    } else {
      setPlayers(
        players.map((player) =>
          player.player.id === selectedPlayer.id ? { ...player, seat } : player,
        ),
      );
      setSelectedPlayer(null);
    }
  };

  const handleCreateGame = async () => {
    if (players.length !== 10) {
      addToast({
        title: "Błąd",
        description: "Musisz dodać 10 graczy do gry",
        color: "danger",
      });
      return;
    }

    if (sequence == null) {
      addToast({
        title: "Błąd",
        description: "Musisz wybrać sekwencję",
        color: "danger",
      });
    }

    if (players.some((player) => player.seat === 0)) {
      addToast({
        title: "Błąd",
        description: "Gracz niepoprawnie przypisany do stanowiska 0",
        color: "danger",
      });
      return;
    }

    if (players.some((player) => player.seat > 10)) {
      addToast({
        title: "Błąd",
        description: "Niepoprawne przypisanie gracza do stanowiska",
        color: "danger",
      });
      return;
    }
    const result = await createGame(
      name,
      sequence?.id ?? 0,
      players.map((player) => ({
        playerId: player.player.id,
        seat: player.seat,
      })),
    );
    if (result.isSuccess) {
      router.push(`/db/games/${result.game?.id}`);
    } else {
      addToast({
        title: "Błąd",
        description: result.message,
        color: "danger",
      });
    }
  };

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
            <span className="text-2xl font-bold text-gray-500">/ Nowa gra</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => console.log("create")}
            >
              Dodaj sekwencję
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl max-h-[calc(100vh-96px)] overflow-y-scroll">
        <Card className="w-full">
          <CardBody>
            <div className="text-2xl font-bold">Utwórz nową grę</div>
          </CardBody>
          <Divider />
          <CardBody>
            <div className="flex flex-row items-center justify-between">
              <div className="text-2xl flex flex-row items-center gap-2 w-full">
                <div className="text-white font-bold">Nazwa gry:</div>
                <Input
                  placeholder="Wpisz nazwę gry"
                  value={name}
                  className="max-w-96 min-w-48"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </CardBody>
          <CardBody>
            <div className="flex flex-row items-center justify-between">
              <div className="text-2xl flex flex-row items-center gap-2 w-full">
                <div className="text-white font-bold">Sekwencja:</div>
                <Input
                  placeholder="Wybierz sekwencję"
                  value={sequence?.name ?? ""}
                  isReadOnly
                  className="max-w-96 min-w-48"
                  onClick={() => setShowSelectSequence(true)}
                  isInvalid={
                    (sequence?.questions?.filter(
                      (question) => question.sequencePart === 0,
                    ).length ?? 0) < 20 && sequence !== null
                  }
                  errorMessage={
                    (sequence?.questions?.filter(
                      (question) => question.sequencePart === 0,
                    ).length ?? 0) < 20
                      ? "Ta sekwencja ma niej niz 20 pytań w pierwszej części, gry z nią nie będą mogły być wystartowane"
                      : ""
                  }
                />
                <Button
                  variant="flat"
                  color={sequence ? "success" : "primary"}
                  isIconOnly
                  onPress={() => setShowSelectSequence(true)}
                >
                  {sequence ? <ArrowUpDownIcon /> : <PlusIcon />}
                </Button>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardBody className="w-full max-h-[50vh]">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="text-2xl flex flex-col items-center gap-2 w-full">
                <div className="flex flex-row items-start gap-2 w-full">
                  <span className="text-white font-bold">Gracze:</span>{" "}
                </div>
                <div className="flex flex-col items-center gap-4 flex-wrap w-full min-h-4">
                  <Card
                    className="w-full"
                    isPressable={players.length < 10}
                    isHoverable={players.length < 10}
                    isDisabled={players.length >= 10}
                    onPress={() =>
                      players.length < 10 && setShowAddPlayerToGame(true)
                    }
                  >
                    <CardBody className="flex flex-row items-center justify-center gap-2 bg-white/5 text-primary">
                      <PlusIcon size="36px" />
                      <div>Dodaj gracza</div>
                    </CardBody>
                  </Card>
                  <Divider />
                  {Array.from({ length: 10 }).map((_, index) => {
                    const player = players.find((p) => p.seat === index + 1);
                    if (!player) return null;

                    return (
                      <Card key={player.player.id} className="w-full">
                        <CardBody className="flex flex-row items-center justify-center bg-white/5">
                          <div className="flex flex-row items-center justify-start gap-4 w-full">
                            <Avatar
                              name={player.player.name.charAt(0).toUpperCase()}
                              style={{ backgroundColor: player.player.color }}
                            />
                            <div className="flex flex-col items-start justify-start gap-1">
                              <div className="text-white">
                                {player.player.name}
                              </div>
                              <div className="text-gray-500 text-sm">
                                Pozycja: {player.seat}
                              </div>
                            </div>
                          </div>
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                variant="light"
                                color="default"
                                isIconOnly
                                onPress={() =>
                                  handleRemovePlayer(player.player.id)
                                }
                              >
                                <EllipsisVerticalIcon />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                              <DropdownItem
                                key="change-position"
                                onPress={() => {
                                  setSelectedPlayer(player.player);
                                  setShowSelectPlayerSeat(true);
                                }}
                              >
                                Zmień stanowisko
                              </DropdownItem>
                              <DropdownItem
                                key="remove-player"
                                color="danger"
                                onPress={() =>
                                  handleRemovePlayer(player.player.id)
                                }
                              >
                                Usuń gracza
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </CardBody>
                      </Card>
                    );
                  })}
                  {players.length === 0 && (
                    <div className="text-white">
                      Nie dodano graczy do tej gry.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardBody>
            <Button
              color="primary"
              onPress={handleCreateGame}
              isDisabled={players.length !== 10}
            >
              Utwórz grę
            </Button>
          </CardBody>
        </Card>
      </div>
      <SelectSequenceModal
        isOpen={showSelectSequence}
        onClose={() => setShowSelectSequence(false)}
        onSelect={(sequence) => handleSelectSequence(sequence)}
      />
      <AddPlayerToGameModal
        isOpen={showAddPlayerToGame}
        onClose={() => setShowAddPlayerToGame(false)}
        onSelect={(player, seat) => handleAddPlayer(player, seat)}
        assignedPlayers={players.map((player) => ({
          seat: player.seat,
          player: player.player.name,
        }))}
      />
      <SelectPlayerSeatModal
        isOpen={showSelectPlayerSeat}
        onClose={() => setShowSelectPlayerSeat(false)}
        onSelect={(seat) => {
          if (selectedPlayer) {
            handleUpdatePlayerSeat(seat);
          }
        }}
        assignedPlayers={players.map((player) => ({
          seat: player.seat,
          player: player.player.name,
        }))}
        selectedPlayer={selectedPlayer}
      />
    </div>
  );
}
