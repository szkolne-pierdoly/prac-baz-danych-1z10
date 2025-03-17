"use server";

import { Player } from "../models/Player";

export async function getPlayers(): Promise<{
  isSuccess: boolean;
  message: string;
  players?: Player[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`);
  const data = await res.json();
  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get players" };
  }

  return {
    isSuccess: true,
    message: "Players fetched successfully",
    players: data.players,
  };
}

export async function createPlayer(name: string): Promise<{
  isSuccess: boolean;
  message: string;
  player?: Player;
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });

  console.log(res);

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to create player" };
  }

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to create player" };
  }

  return {
    isSuccess: true,
    message: "Player created successfully",
  };
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

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to update player" };
  }

  return {
    isSuccess: true,
    message: "Player updated successfully",
    player: data.player,
  };
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

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get player by id" };
  }

  return {
    isSuccess: true,
    message: "Player fetched successfully",
    player: data.player,
  };
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

  return {
    isSuccess: true,
    message: "Player deleted successfully",
  };
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

  return {
    isSuccess: true,
    message: "Players deleted successfully",
  };
}
