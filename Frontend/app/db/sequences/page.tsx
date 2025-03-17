"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Sequence } from "../../models/Sequence";
import { useState, useEffect } from "react";
import { getAllSequences } from "@/app/actions/sequence";

export default function SequencesPage() {
  const [sequences, setSequences] = useState<Sequence[]>([]);

  const router = useRouter();

  const handleFetchSequences = async () => {
    const result = await getAllSequences();
    if (result.isSuccess) {
      setSequences(result.sequences ?? []);
    }
  };

  useEffect(() => {
    handleFetchSequences();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
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
              <div className="flex flex-row items-center justify-between gap-2 h-4">
                <div className="text-sm text-gray-500">
                  Pierwsza część: {sequence.part1Questions.length} pytań
                </div>
                <Divider orientation="vertical" />
                <div className="text-sm text-gray-500">
                  Druga część: {sequence.part2Questions.length} pytań
                </div>
                <Divider orientation="vertical" />
                <div className="text-sm text-gray-500">
                  Trzecia część: {sequence.part3Questions.length} pytań
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
    </div>
  );
}
