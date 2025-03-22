"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStats } from "./actions/other";

export default function Home() {
  const [stats, setStats] = useState<{
    totalQuestions: number;
    totalSequences: number;
    totalPlayers: number;
    totalGames: number;
  } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getStats();
      if (result.isSuccess && result.data) {
        setStats(result.data);
      }
    };
    fetchStats();
  }, []);

  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-center text-6xl mb-4">Panel operatora</h1>
      <Divider />
      <div className="flex flex-col w-full h-full items-center justify-start max-h-[75vh] px-2 gap-4">
        <div className="flex flex-col items-center justify-center mt-4 w-full max-w-4xl gap-4">
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <div className="w-full text-2xl font-bold">Baza danych</div>
            <div className="text-sm text-gray-500 w-full">
              Kliknij w kartę aby zobaczyć wiecej informacji.
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-4 w-full max-w-4xl gap-4">
            <Card
              className="w-full max-w-[25%] min-w-[100px]"
              isPressable
              onPress={() => router.push("/db/questions")}
            >
              <CardBody>
                <div className="text-2xl font-bold">
                  Pytania: {stats?.totalQuestions ?? "-"}
                </div>
              </CardBody>
            </Card>
            <Card
              className="w-full max-w-[25%] min-w-[100px]"
              isPressable
              onPress={() => router.push("/db/sequences")}
            >
              <CardBody>
                <div className="text-2xl font-bold">
                  Sekwencje: {stats?.totalSequences ?? "-"}
                </div>
              </CardBody>
            </Card>
            <Card
              className="w-full max-w-[25%] min-w-[100px]"
              isPressable
              onPress={() => router.push("/db/players")}
            >
              <CardBody>
                <div className="text-2xl font-bold">
                  Gracze: {stats?.totalPlayers ?? "-"}
                </div>
              </CardBody>
            </Card>
            <Card className="w-full max-w-[25%] min-w-[100px]" isPressable>
              <CardBody>
                <div className="text-2xl font-bold">
                  Gry: {stats?.totalGames ?? "-"}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col items-center justify-center mt-4 w-full max-w-4xl gap-4">
          <Card
            isPressable
            isHoverable
            onPress={() => router.push("/game/start")}
          >
            <CardBody className="bg-emerald-600/30">
              <div className="text-2xl font-bold">Rozpocznij grę!</div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
