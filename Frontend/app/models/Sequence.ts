import { Game } from "./Game";
import { SequenceQuestion } from "./SequenceQuestion";

export interface Sequence {
  id: number;
  name: string;
  games: Game[];
  questions: SequenceQuestion[];
}
