import { Player } from "./Player";
import { GameActionType } from "../enums/gameActionType";

export interface GameAction {
  id: number;
  gameId: number;
  type: GameActionType;
  createdAt: Date;
  playerId?: number;
  player?: Player;
  points?: number;
  answerCorrect?: boolean;
}
