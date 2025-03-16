import { Player } from "./Player";

export interface Game {
  id: number;
  name: string;
  playerId: number;
  sequenceId: number;
  // answers: Answer[]; // TODO: omitting complex types for now
  // sequence: Sequence; // TODO: omitting complex types for now
  player: Player;
}
