"use client";

import { Button, Card, CardBody } from "@heroui/react";

export default function QuestionsPage() {
  return (
    <div className="flex flex-col items-center justify-start h-screen py-4">
      <Card className="w-full flex flex-row items-start justify-start max-w-4xl">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="text-2xl font-bold">Pytania</div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button variant="flat" color="default">
              Edytuj
            </Button>
            <Button variant="flat" color="primary">
              Dodaj pytanie
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
