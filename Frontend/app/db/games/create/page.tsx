"use client";

import { GamePlayer } from "@/app/models/GamePlayer";
import { Sequence } from "@/app/models/Sequence";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@heroui/react";
import { ListStartIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function CreateGame() {
  const [gameName, setGameName] = useState<string>("");
  const [gameSequence, setGameSequence] = useState<Sequence | null>(null);
  const [gamePlayers, setGamePlayers] = useState<GamePlayer[]>([]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4 w-screen h-screen">
        <h1 className="text-3xl font-bold text-center">Dodaj grę</h1>
        <Divider />
        <div className="flex flex-col items-center justify-start min-h-[60vh] w-screen gap-4">
          <Card className="w-full max-w-xl">
            <CardHeader className="text-2xl font-bold flex flex-row items-start">
              Nazwij grę
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col items-center justify-center">
                <Input
                  type="text"
                  label="Nazwa gry"
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                />
              </div>
            </CardBody>
          </Card>
          <Card className="w-full max-w-xl">
            <CardHeader className="text-2xl font-bold flex flex-row items-start">
              Wybierz sekwencję
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col items-center justify-center">
                <div className="font-bold text-lg w-full text-left">
                  Aktualana sekwencja: {gameSequence?.name ?? "nie wybrano"}
                </div>
                <div className="flex flex-col items-center justify-center"></div>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-row items-center justify-center gap-2">
              {gameSequence ? (
                <Button
                  color="secondary"
                  onPress={() => {}}
                  variant="flat"
                  className="w-1/2"
                >
                  Edytuj sekwencję
                </Button>
              ) : (
                <Button
                  color="primary"
                  onPress={() => {}}
                  variant="flat"
                  endContent={<ListStartIcon />}
                  fullWidth
                >
                  Wybierz sekwencję
                </Button>
              )}
            </CardFooter>
          </Card>
          <Card className="w-full max-w-xl">
            <CardHeader className="text-2xl font-bold flex flex-row items-start">
              Dodaj graczy
            </CardHeader>
            <Divider />
            <CardBody className="max-h-96 min-h-32">
              <div className="flex flex-col items-center justify-center w-full h-full">
                {gamePlayers.map((player) => (
                  <Card className="w-full" radius="md" key={player.id}>
                    <CardBody className="bg-white/5">
                      <div className="flex flex-col items-center justify-center">
                        {player.name}
                      </div>
                    </CardBody>
                  </Card>
                ))}
                {gamePlayers.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full w-full text-2xl font-bold">
                    <p>Nie ma graczy</p>
                  </div>
                )}
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-row items-center justify-center gap-2">
              <Button
                color="primary"
                onPress={() => {}}
                variant="flat"
                endContent={<PlusIcon />}
                fullWidth
              >
                Dodaj gracza
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
