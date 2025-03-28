import { Sequence } from "./Sequence";
import { Answer } from "./Answer";
import { GamePlayer } from "./GamePlayer";

export interface Game {
  id: number;
  name?: string;
  sequenceId: number;
  players: GamePlayer[];
  answers: Answer[];
  sequence: Sequence;
  createdAt: Date;
  updatedAt?: Date;
}
