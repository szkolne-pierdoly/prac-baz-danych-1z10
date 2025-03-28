"use server";

import { Game } from "../models/Game";

export async function createGame(
  name: string,
  sequenceId: number,
  players: { playerId: number; seat: number }[],
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
    body: JSON.stringify({
      name: name,
      sequenceId: sequenceId,
      players: players,
    }),
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to create game" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game created successfully",
    game: data.game,
  };
}

export async function getGames(
  limit?: number,
  offset?: number,
  search?: string,
): Promise<{
  isSuccess: boolean;
  message: string;
  games?: Game[];
}> {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/games`);
  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }
  if (offset) {
    url.searchParams.append("offset", offset.toString());
  }
  if (search) {
    url.searchParams.append("search", search);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get games" };
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
