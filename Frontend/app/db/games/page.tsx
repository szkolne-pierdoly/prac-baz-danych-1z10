"use client";

import { Game } from "@/app/models/Game";
import { Button, CardBody } from "@heroui/react";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const result = await getAllGames();
    setGames(result.games ?? []);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-center justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody className="flex flex-row items-center justify-start gap-2">
          <Button variant="flat" isIconOnly>
            <HomeIcon />
          </Button>
          <div className="text-2xl font-bold">Gry</div>
        </CardBody>
        <CardBody className="flex flex-row items-center justify-end gap-2">
          <Button variant="flat" color="primary">
            Nowa gra
          </Button>
        </CardBody>
      </Card>
      <div className="w-full h-full max-w-4xl max-h-[calc(100vh-64px)]">
        <div className="flex flex-wrap items-start justify-center w-full gap-4">
          {games.map((game) => (
            <Card
              key={game.id}
              className="min-w-64 max-w-[33vw] p-2"
              isPressable
            >
              <CardBody className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">{game.id}</div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
