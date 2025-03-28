"use client";

import { getGameById } from "@/app/actions/game";
import { SequencePart } from "@/app/enums/sequencePart";
import { Game } from "@/app/models/Game";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Tooltip,
  Link,
  Avatar,
} from "@heroui/react";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function GameClientPage({ gameId }: { gameId: number }) {
  const router = useRouter();

  const [game, setGame] = useState<Game | null>(null);

  const handleFetchGame = useCallback(async () => {
    const result = await getGameById(gameId);
    if (result.isSuccess && result.game) {
      setGame(result.game);
    }
  }, [gameId]);

  useEffect(() => {
    handleFetchGame();
  }, [handleFetchGame]);

  const handleGoGames = () => {
    router.push("/db/games");
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
          <CardBody className="h-20">
            <div className="text-2xl font-bold">Gracze</div>
          </CardBody>
          <Divider />
          <CardBody className="overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-2">
              {game?.players
                .sort((a, b) => a.seat - b.seat)
                .map((player) => (
                  <Card key={player.id} className="w-full">
                    <CardBody className="h-auto bg-white/5">
                      <div className="flex flex- items-center justify-start gap-2">
                        <Avatar
                          style={{ backgroundColor: player.color }}
                          name={player.name.charAt(0)}
                        />
                        <div className="flex flex-col items-start justify-center">
                          <div className="text-2xl font-bold">
                            {player.name}
                          </div>
                          <div className="text-gray-400">
                            Stanowisko: {player.seat}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
