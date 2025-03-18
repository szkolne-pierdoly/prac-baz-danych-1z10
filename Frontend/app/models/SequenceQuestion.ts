import { Question } from "./Question";
import { SequencePart } from "../enums/sequencePart";

export default interface SequenceQuestion {
  id: number;
  order: number;
  questionId: number;
  sequenceId: number;
  question: Question;
  sequencePart: SequencePart;
}
