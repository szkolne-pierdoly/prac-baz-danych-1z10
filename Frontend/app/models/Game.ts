import { Player } from "./Player";
import { Sequence } from "./Sequence";
import { Answer } from "./Answer";

export interface Game {
  id: number;
  name?: string;
  sequenceId: number;
  players: Player[];
  answers: Answer[];
  sequence: Sequence;
  createdAt: Date;
  updatedAt?: Date;
}
