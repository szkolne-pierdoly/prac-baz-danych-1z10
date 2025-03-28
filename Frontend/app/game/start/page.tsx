"use client";

import { Game } from "@/app/models/Game";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Tooltip,
} from "@heroui/react";
import { PencilLineIcon } from "lucide-react";
import SelectGameModal from "@/app/components/selectGameModal";

export default function StartGamePage() {
  const [game, setGame] = useState<Game | null>(null);

  const [showsSelectGameModal, setShowsSelectGameModal] = useState(true); // TODO: set to false after testing

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>Rozpocznij grę</CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <div>
            Gra: {game ? (game.name ?? "Gra bez nazwy") : "Nie wybrano"}
          </div>
          {game === null ? (
            <Button
              color="success"
              variant="flat"
              fullWidth
              onPress={() => setShowsSelectGameModal(true)}
            >
              Wybierz grę
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                color="secondary"
                variant="flat"
                fullWidth
                onPress={() => setShowsSelectGameModal(true)}
              >
                Zmień grę
              </Button>
              <Tooltip content="Duplikuj i edytuj">
                <Button color="default" variant="flat" isIconOnly>
                  <PencilLineIcon />
                </Button>
              </Tooltip>
            </div>
          )}
        </CardBody>
        <CardFooter>
          <Button fullWidth color="primary">
            Rozpocznij grę
          </Button>
        </CardFooter>
      </Card>
      <SelectGameModal
        isOpen={showsSelectGameModal}
        onClose={() => setShowsSelectGameModal(false)}
        onSelect={(game) => {
          setGame(game);
          setShowsSelectGameModal(false);
        }}
      />
    </div>
  );
}
