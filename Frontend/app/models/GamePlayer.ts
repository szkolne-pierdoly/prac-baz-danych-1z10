import { GameAction } from "./GameAction";

export interface GamePlayer {
  id: number;
  gameId: number;
  playerId: number;
  name: string;
  points: number;
  lives: number;
  actions: GameAction[];
}
