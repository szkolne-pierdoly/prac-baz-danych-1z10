"use client";

import { getPlayers } from "@/app/actions/player";
import { useState } from "react";
import { useEffect } from "react";
import { Player } from "@/app/models/Player";
import { Avatar, Card, CardBody } from "@heroui/react";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    const players = await getPlayers();
    if (players.isSuccess && players.players) {
      setPlayers(players.players);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="flex flex-wrap items-start justify-center w-full gap-4">
      {players.map((player) => (
        <Card key={player.id} className="min-w-64 max-w-[33vw] p-2">
          <CardBody className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">
              <Avatar
                name={player.name.charAt(0)}
                style={{ backgroundColor: player.color }}
                size="lg"
              />
            </div>
            <div className="mt-2 text-xl font-bold">{player.name}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
