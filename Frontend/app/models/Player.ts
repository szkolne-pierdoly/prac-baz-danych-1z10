import { Game } from "./Game";

export interface Player {
  id: number;
  name: string;
  games: Game[];
}
