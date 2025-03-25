"use client";

import { getPlayers } from "@/app/actions/player";
import { useState } from "react";
import { useEffect } from "react";
import { Player } from "@/app/models/Player";
import { Avatar, Card, CardBody, Button } from "@heroui/react";
import EditPlayerModal from "@/app/components/editPlayerModal";
import AddPlayerModal from "@/app/components/addPlayerModal";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] =
    useState<boolean>(false);
  const fetchPlayers = async () => {
    const players = await getPlayers();
    if (players.isSuccess && players.players) {
      setPlayers(players.players);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-center justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody className="flex flex-row items-center justify-start gap-2">
          <Button variant="flat" isIconOnly onPress={() => router.push("/")}>
            <HomeIcon />
          </Button>
          <div className="text-2xl font-bold">Gracze</div>
        </CardBody>
        <CardBody className="flex flex-row items-center justify-end gap-2">
          <Button
            variant="flat"
            color="primary"
            onPress={() => setIsAddPlayerDialogOpen(true)}
          >
            Dodaj gracza
          </Button>
        </CardBody>
      </Card>
      <div className="w-full h-full max-w-4xl overflow-y-auto">
        <div className="flex flex-wrap items-start justify-center w-full gap-4">
          {players.map((player) => (
            <Card
              key={player.id}
              className="min-w-64 max-w-[33vw] p-2"
              isPressable
              onPress={() => setEditingPlayer(player)}
            >
              <CardBody className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                  <Avatar
                    name={player.name.charAt(0)}
                    style={{ backgroundColor: player.color }}
                    size="lg"
                  />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xl font-bold">{player.name}</div>
                  <div className="text-gray-400 text-sm">ID: {player.id}</div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <EditPlayerModal
          isOpen={editingPlayer !== null}
          onClose={() => setEditingPlayer(null)}
          onSuccess={() => fetchPlayers()}
          player={editingPlayer!}
        />
        <AddPlayerModal
          isOpen={isAddPlayerDialogOpen}
          onClose={() => setIsAddPlayerDialogOpen(false)}
          onSuccess={() => fetchPlayers()}
        />
      </div>
    </div>
  );
}
