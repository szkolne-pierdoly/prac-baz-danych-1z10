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

export async function duplicateGame(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  gameId?: number;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}/duplicate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to duplicate game" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game duplicated successfully",
    gameId: data.newGameId,
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
  name?: string,
  players?: { playerId: number; seat: number }[],
): Promise<{
  isSuccess: boolean;
  message: string;
  game?: Game;
}> {
  console.log("sequenceIdw", sequenceId);
  console.log("name", name);
  console.log("players", players);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sequenceId: sequenceId ?? undefined,
        players: players ?? undefined,
        name: name ?? undefined,
      }),
    },
  );

  if (!res.ok) {
    console.log(await res.json());
    return { isSuccess: false, message: "Failed to update game" };
  }

  const data = await res.json();
  // console.log(data);

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

export async function startGame(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  gameToken?: string;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${id}/start`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to start game" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Game started successfully",
    gameToken: data.gameToken,
  };
}
