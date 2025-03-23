import { Player } from "./Player";
import { Sequence } from "./Sequence";
import { Answer } from "./Answer";

export interface Game {
  id: number;
  name?: string;
  sequenceId: number;
  playerId: number;
  answers: Answer[];
  sequence: Sequence;
  player: Player;
  createdAt: Date;
  updatedAt?: Date;
}
