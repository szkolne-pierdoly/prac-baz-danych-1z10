import { Question } from "./Question";
import { SequencePart } from "../enums/sequencePart";

export interface SequenceQuestion {
  id: number;
  sequenceId: number;
  questionId: number;
  order: number;
  part: number;
  question: Question;
  sequencePart: SequencePart;
}
