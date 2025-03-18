import SequenceQuestion from "./SequenceQuestion";
import { Game } from "./Game";

export interface Sequence {
  id: number;
  name: string;
  games: Game[];
  questions: SequenceQuestion[];
}
