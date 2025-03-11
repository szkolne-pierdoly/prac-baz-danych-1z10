"use client";

import { Card, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
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
    <div className="w-full flex flex-col items-start justify-start max-w-4xl gap-2">
      {sequences.map((sequence) => (
        <Card
          className="w-full flex flex-row items-start justify-start max-w-4xl"
          key={sequence.id}
          isPressable
          onPress={() => router.push(`/db/sequences/${sequence.id}`)}
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
      {sequences.length === 0 && (
        <div className="text-center text-gray-300 text-4xl mt-12 font-bold items-center justify-center w-full">
          Brak sekwencji.
        </div>
      )}
    </div>
  );
}
