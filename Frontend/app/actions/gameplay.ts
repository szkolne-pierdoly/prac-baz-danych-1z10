"use server";

import { GameAction } from "../models/GameAction";
import { GamePlayer } from "../models/GamePlayer";
import { Question } from "../models/Question";
import { Sequence } from "../models/Sequence";

export async function validateGameToken(token: string): Promise<{
  isSuccess: boolean;
  message: string;
  isValid?: boolean;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gameplay/token/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameToken: token,
      }),
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to validate game token" };
  }

  const data = await res.json();
  console.log(data);
  return {
    isSuccess: true,
    message: "Game token validated successfully",
    isValid: data.isValid,
  };
}
export async function getAllData(gameToken: string): Promise<{
  isSuccess: boolean;
  message: string;
  data?: {
    name: string;
    players: GamePlayer[];
    actions: GameAction[];
    sequence: Sequence;
    currentQuestion: Question;
    currentPlayer: GamePlayer;
    currentSequencePart: number;
    createdAt: string;
    updatedAt: string;
    startTime: string;
    endTime: string;
  };
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gameplay/all-data?gameToken=${gameToken}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get game data" };
  }

  const data = await res.json();
  return {
    isSuccess: true,
    message: "Game data retrieved successfully",
    data: data.data,
  };
}

export async function getStats(gameToken: string): Promise<{
  isSuccess: boolean;
  message: string;
  stats?: {
    name: string;
    currentQuestion: Question;
    currentPlayer: GamePlayer;
    currentSequencePart: number;
  };
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gameplay/stats?gameToken=${gameToken}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get game stats" };
  }

  const data = await res.json();
  return {
    isSuccess: true,
    message: "Game stats retrieved successfully",
    stats: data.stats,
  };
}
