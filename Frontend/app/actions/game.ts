"use server";

import { Game } from "../models/Game";

export async function startGame(
  sequenceId: number,
  playerIds: number[],
): Promise<{
  isSuccess: boolean;
  message: string;
  game?: Game;
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sequenceId: sequenceId, playerIds: playerIds }),
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to start game" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game started successfully",
    game: data.game,
  };
}

export async function getAllGames(): Promise<{
  isSuccess: boolean;
  message: string;
  games?: Game[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get all games" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Games fetched successfully",
    games: data.games,
  };
}

export async function getGameById(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  game?: Game;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get game by id" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game fetched successfully",
    game: data.game,
  };
}

export async function updateGame(
  id: number,
  sequenceId?: number,
  playerIds?: number[],
): Promise<{
  isSuccess: boolean;
  message: string;
  game?: Game;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sequenceId: sequenceId, playerIds: playerIds }),
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to update game" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game updated successfully",
    game: data.game,
  };
}

export async function deleteGame(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  game?: Game;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to delete game" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game deleted successfully",
    game: data.game,
  };
}
