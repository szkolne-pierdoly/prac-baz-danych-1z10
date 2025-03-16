"use server";

import { Player } from "../models/Player";

export async function getPlayers(): Promise<{
  isSuccess: boolean;
  message: string;
  players?: Player[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`);
  const data = await res.json();
  return data;
}

export async function createPlayer(player: Player): Promise<{
  isSuccess: boolean;
  message: string;
  player?: Player;
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, {
    method: "POST",
    body: JSON.stringify(player),
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to create player" };
  }

  const data = await res.json();
  return data;
}

export async function updatePlayer(player: Player): Promise<{
  isSuccess: boolean;
  message: string;
  player?: Player;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${player.id}`,
    {
      method: "PUT",
      body: JSON.stringify(player),
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to update player" };
  }

  const data = await res.json();
  return data;
}

export async function getPlayerById(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  player?: Player;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`,
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get player by id" };
  }

  const data = await res.json();
  return data;
}

export async function deletePlayer(id: number): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to delete player" };
  }

  const data = await res.json();
  return data;
}

export async function deleteMultiplePlayers(ids: number[]): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/players/delete-multiple`,
    {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to delete multiple players" };
  }

  const data = await res.json();
  return data;
}
