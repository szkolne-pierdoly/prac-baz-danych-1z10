"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import HomeIcon from "../../assets/icons/HomeIcon";
import { Sequence } from "../../models/Sequence";
import { useState, useEffect } from "react";

export default function SequencesPage() {
  const [sequences, setSequences] = useState<Sequence[]>([]);

  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  function handleLoadSequences() {
    fetch(`${apiUrl}/api/sequences`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch sequences");
        }
        return res.json();
      })
      .then((data) => setSequences(data.sequences))
      .catch((err) => console.error("Error loading sequences:", err));
  }

  useEffect(() => {
    handleLoadSequences();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl">
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
            <div className="text-2xl font-bold">Sekwencje</div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => console.log("TODO: add add sequence method")}
            >
              Dodaj sekwencję
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl">
        {sequences.map((sequence) => (
          <Card
            className="w-full flex flex-row items-start justify-start max-w-4xl"
            key={sequence.id}
            isPressable
          >
            <CardBody className="flex flex-col items-start justify-start gap-2">
              <div className="text-2xl font-bold">{sequence.name}</div>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="text-sm text-gray-500">
                  Ilość pytań: {sequence.questions.length ?? 0}
                </div>
                <div className="text-sm text-gray-500">
                  Ilość gier: {sequence.questions.length ?? 0}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
