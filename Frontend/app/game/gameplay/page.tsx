"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDialog from "@/app/components/loadingDialog";
import { getAllData, validateGameToken } from "@/app/actions/gameplay";
import { addToast, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { GamePlayer } from "@/app/models/GamePlayer";
import { SequenceQuestion } from "@/app/models/SequenceQuestion";
import { GameAction } from "@/app/models/GameAction";
import { BanIcon, EllipsisVerticalIcon, ShieldX, StopCircleIcon } from "lucide-react";

export default function GameplayPage() {
  const [gameToken, setGameToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [gameName, setGameName] = useState<string | null>(null);
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<SequenceQuestion | null>(null);
  const [actions, setActions] = useState<GameAction[]>([]);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const router = useRouter();

  const handleGetStats = useCallback(async () => {
    if (!gameToken) {
      router.push("/");
      return;
    }

    const res = await getAllData(gameToken);
    console.log(res);
    if (!res.isSuccess) {
      addToast({
        title: "Wystąpił błąd podczas pobierania danych.",
        description: res.message,
        color: "danger",
      });
      return;
    }

    if (!res.data) {
      router.push("/");
      return;
    }

    console.log(res.data);
    setGameName(res.data.name);
    setPlayers(res.data.players);
    setQuestions(res.data.sequence.questions);
    setCurrentPlayer(res.data.players[0]);
    setCurrentQuestion(res.data.sequence.questions[0]);
    setActions(res.data.actions);
    setStartedAt(new Date(res.data.startTime));
    setUpdatedAt(new Date(res.data.updatedAt));
  }, [gameToken, router]);

  const handleValidateGameToken = useCallback(async () => {
    const token = localStorage.getItem("gameToken");

    if (!token) {
      router.push("/");
      return;
    }

    const res = await validateGameToken(token);

    if (!res.isSuccess) {
      router.push("/");
      addToast({
        title: "Nieprawidłowy token",
        description: res.message,
        color: "danger",
      });
      return;
    }

    if (!res.isValid) {
      router.push("/");
      addToast({
        title: "Nieprawidłowy token",
        description: "Prosze poprawne zacząć nową grę",
        color: "danger",
      });
      return;
    }

    setGameToken(token);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    handleValidateGameToken();
  }, [handleValidateGameToken]);

  useEffect(() => {
    if (gameToken) {
      handleGetStats();
    }
  }, [gameToken, handleGetStats]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <div className="max-w-5xl w-full h-full flex flex-col gap-4 items-center justify-start">
        <Card className="mt-4 w-full">
          <CardBody className="flex flex-row items-center justify-between">
            <div className="text-2xl font-bold max-w-[80%] truncate">
              {gameName}
            </div>
            <div className="flex flex-row items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="flat" color="default">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    startContent={<ShieldX />}
                    key="restart"
                    color="danger"
                  >
                    Stop game
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardBody>
        </Card>
        <div className="max-w-4xl w-full h-full flex flex-col gap-4">
          <Card>
            <CardBody>
              <div className="flex flex-row gap-2">
                <div className="text-2xl font-bold max-w-[70%] truncate">
                  {gameName}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <LoadingDialog isLoading={isLoading} blackBackground={true} />
    </div>
  );
}
