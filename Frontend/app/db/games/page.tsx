/* eslint-disable prettier/prettier */
"use client";

import { Game } from "@/app/models/Game";
import { Button, CardBody, Divider, addToast } from "@heroui/react";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import { getGames } from "@/app/actions/game";
import { useRouter } from "next/navigation";

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const result = await getGames();
    if (result.isSuccess && result.games) {
      console.log(result.games);
      setGames(result.games);
    } else {
      addToast({
        title: "Błąd",
        description: "Nie udało się pobrać gier",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-center justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody className="flex flex-row items-center justify-start gap-2">
          <Button variant="flat" isIconOnly onPress={() => router.push("/")}>
            <HomeIcon />
          </Button>
          <div className="text-2xl font-bold">Gry</div>
        </CardBody>
        <CardBody className="flex flex-row items-center justify-end gap-2">
          <Button variant="flat" color="primary" onPress={() => router.push("/db/games/create")}>
            Nowa gra
          </Button>
        </CardBody>
      </Card>
      <div className="w-full h-full max-w-4xl overflow-y-auto">
        <div className="flex flex-col gap-2">
          {games.map((game) => (
            <Card
              key={game.id}
              className="min-w-64 flex flex-row h-16"
              isPressable
              onPress={() => router.push(`/db/games/${game.id}`)}
            >
              <CardBody className="flex flex-col items-center justify-center w-fit h-full px-4">
                <div className="text-2xl font-bold">{game.id}</div>
              </CardBody>
              <Divider orientation="vertical" />
              <CardBody className="flex flex-col items-start justify-center w-full h-full overflow-hidden py-0">
                <div className="text-lg font-bold">
                  {game.name ?? "Brak nazwy"}
                </div>
                <div className="text-sm text-gray-500">
                  Utworzono: {game.createdAt
                    ? new Date(game.createdAt).toLocaleString("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Date not available"}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
