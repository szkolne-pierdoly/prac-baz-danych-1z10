"use client";

import SelectSequenceModal from "@/app/components/selectSequenceModal";
import { Player } from "@/app/models/Player";
import { Sequence } from "@/app/models/Sequence";
import { Card, CardBody, Button, Divider, Input } from "@heroui/react";
import { ArrowUpDownIcon, HomeIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGamePage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [sequence, setSequence] = useState<Sequence | null>(null);

  const [showSelectSequence, setShowSelectSequence] = useState<boolean>(false);

  const handleGoGames = () => {
    router.push("/db/games");
  };

  const handleSelectSequence = (sequence: Sequence) => {
    setSequence(sequence);
    setShowSelectSequence(false);
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
                    ).length ?? 0) < 20
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
          <CardBody className="w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="text-2xl flex flex-col items-center gap-2 w-full">
                <div className="flex flex-row items-start gap-2 w-full">
                  <span className="text-white font-bold">Gracze:</span>{" "}
                </div>
                <div className="flex flex-row items-center gap-4 flex-wrap w-full min-h-4">
                  <Card
                    className="basis-[calc(33.333%-1rem)] aspect-square"
                    isPressable
                    isHoverable
                    onPress={() => {
                      setPlayers([
                        ...players,
                        { id: players.length + 1, name: "", color: "default" },
                      ]);
                    }}
                  >
                    <CardBody className="flex items-center justify-center">
                      <PlusIcon className="text-white" size="30%" />
                      <div className="text-white">Dodaj gracza</div>
                    </CardBody>
                  </Card>
                  {players.map((player) => (
                    <Card
                      key={player.id}
                      className="basis-[calc(33.333%-1rem)] aspect-square"
                    >
                      <CardBody className="flex items-center justify-center">
                        <div className="text-white">{player.name}</div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <SelectSequenceModal
        isOpen={showSelectSequence}
        onClose={() => setShowSelectSequence(false)}
        onSelect={(sequence) => handleSelectSequence(sequence)}
      />
    </div>
  );
}
