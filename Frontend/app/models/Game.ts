import { Sequence } from "./Sequence";
import { GamePlayer } from "./GamePlayer";
import { GameAction } from "./GameAction";

export interface Game {
  id: number;
  name?: string;
  createdAt: Date;
  updatedAt?: Date;
  startTime?: Date;
  endTime?: Date;
  gameToken?: string;
  sequenceId: number;
  sequence: Sequence;
  players: GamePlayer[];
  actions: GameAction[];
}
