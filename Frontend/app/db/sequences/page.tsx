"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import HomeIcon from "../../assets/icons/HomeIcon";

export default function SequencesPage() {
  const router = useRouter();

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
    </div>
  );
}
