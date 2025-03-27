import { GameAction } from "./GameAction";

export interface GamePlayer {
  id: number;
  gameId: number;
  playerId: number;
  name: string;
  color: string;
  points: number;
  lives: number;
  seat: number;
  actions: GameAction[];
}
