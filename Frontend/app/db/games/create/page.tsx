"use client";

import { Player } from "@/app/models/Player";
import { Sequence } from "@/app/models/Sequence";
import {
  Card,
  CardBody,
  Button,
  Divider,
  Tooltip,
  Link,
  Spacer,
} from "@heroui/react";
import { ArrowUpDown, HomeIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateGamePage() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [sequence, setSequence] = useState<Sequence | null>(null);

  const handleGoGames = () => {
    router.push("/db/games");
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
              <div className="text-2xl font-bold flex flex-col items-start gap-2">
                <div className="text-white">Sekwencja:</div>
                <div className="flex flex-row items-center gap-4">
                  <Tooltip
                    content="Przejdź do sekwencji"
                    isDisabled={!sequence}
                  >
                    <Link
                      href={`/db/sequences/${sequence?.id}`}
                      className={`text-blue-500 hover:tsext-blue-600 text-2xl ${sequence ? "" : "text-white"}`}
                      isDisabled={!sequence}
                    >
                      {(sequence && sequence?.name) ?? "Nie wybrano"}
                    </Link>
                  </Tooltip>
                  {sequence ? (
                    <Button
                      variant="light"
                      color="primary"
                      onPress={() => console.log("create")}
                      startContent={<ArrowUpDown />}
                    >
                      Zmień sekwencję
                    </Button>
                  ) : (
                    <Button
                      variant="light"
                      color="primary"
                      onPress={() => console.log("create")}
                      startContent={<PlusIcon />}
                    >
                      Wybierz sekwencję
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardBody>
            <div className="flex flex-row items-center justify-between">
              <div className="text-2xl font-bold flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2 mr-6">
                  <span className="text-gray-400">Gracze:</span>{" "}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
