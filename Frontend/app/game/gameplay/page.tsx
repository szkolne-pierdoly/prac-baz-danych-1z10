"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDialog from "@/app/components/loadingDialog";
import { getAllData, validateGameToken } from "@/app/actions/gameplay";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { GamePlayer } from "@/app/models/GamePlayer";
import { SequenceQuestion } from "@/app/models/SequenceQuestion";
import { GameAction } from "@/app/models/GameAction";
import { BanIcon, EllipsisVerticalIcon, ShieldX, StopCircleIcon } from "lucide-react";
import Step1Page from "./step1Page";

export default function GameplayPage() {
  const [gameToken, setGameToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [gameName, setGameName] = useState<string | null>(null);
  const [players, setPlayers] = useState<GamePlayer[]>([]);
  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<SequenceQuestion | null>(null);
  const [currentSequencePart, setCurrentSequencePart] = useState<number>(0);
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
    setCurrentSequencePart(res.data.currentSequencePart);
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
        <div className="max-w-4xl w-full h-full flex flex-col gap-4 text-center">
          <div className="flex flex-col gap-4 w-full items-center">
            <div>
              Etap{" "}
              {currentSequencePart === 0
                ? "Pierwszy"
                : currentSequencePart === 1
                  ? "Drugi"
                  : "Trzeci"}
            </div>
            <div className="flex flex-row gap-4">
              <Card className="text-left flex flex-col gap-2 items-start justify-start w-fit">
                <CardHeader className="text-2xl font-bold">
                  Pytanie: {currentQuestion?.question.content}
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="text-xl font-bold text-gray-300">
                    Wariant 2: {currentQuestion?.question.variant2}
                  </div>
                  <div className="text-xl font-bold text-gray-300">
                    Wariant 3: {currentQuestion?.question.variant3 ?? "Brak"}
                  </div>
                  <div className="text-xl font-bold text-gray-500">
                    Odpowiedź: {currentQuestion?.question.correctAnswer}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader className="text-2xl font-bold">
                  Aktualny gracz: {currentPlayer?.name}
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="text-2xl font-bold text-white text-center">
                    {currentPlayer?.name}
                  </div>
                  <div className="text-2xl font-bold text-white text-center">
                    Punkty:{" "}
                    <span className="text-primary">
                      {currentPlayer?.points}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white text-center">
                    Szanse:{" "}
                    <span className="text-primary">{currentPlayer?.lives}</span>
                    /3
                  </div>
                </CardBody>
              </Card>
            </div>
            <Card>
              <CardBody>
                
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <LoadingDialog isLoading={isLoading} blackBackground={true} />
    </div>
  );
}
