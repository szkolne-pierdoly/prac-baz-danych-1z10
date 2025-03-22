"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  SelectItem,
  Select,
  SelectSection,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { getAllSequences } from "@/app/actions/sequence";
import { Sequence } from "@/app/models/Sequence";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StartPage() {
  const router = useRouter();

  const [sequences, setSequences] = useState<Sequence[]>([]);

  const [selectedSequenceId, setSelectedSequenceId] = useState<number>(0);

  const fetchSequences = async () => {
    const result = await getAllSequences();
    if (result.isSuccess) {
      setSequences(result.sequences ?? []);
    } else {
      console.error(result.message);
    }
  };

  useEffect(() => {
    fetchSequences();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-2xl font-bold">
          Rozpocznij nową grę
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <div className="text-lg font-bold">Wybierz sekwencję</div>
              <div className="flex flex-row gap-2 w-full">
                <Select
                  selectedKeys={selectedSequenceId.toString()}
                  onChange={(e) =>
                    setSelectedSequenceId(Number(e.target.value))
                  }
                >
                  <SelectSection items={sequences}>
                    {(sequence) => (
                      <SelectItem key={sequence.id} textValue={sequence.name}>
                        {sequence.name}
                      </SelectItem>
                    )}
                  </SelectSection>
                  <SelectItem key={0} textValue="Brak wybranej sekwencji">
                    Brak wybranej sekwencji
                  </SelectItem>
                </Select>
                {selectedSequenceId !== 0 ? (
                  <Link
                    href={`/db/sequences/${selectedSequenceId}`}
                    target="_blank"
                  >
                    <Button>Zobacz sekwencje</Button>
                  </Link>
                ) : (
                  <div>
                    <Button isDisabled>Zobacz sekwencje</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Button onPress={() => router.push("/game/play")}>Rozpocznij grę</Button>
    </div>
  );
}
