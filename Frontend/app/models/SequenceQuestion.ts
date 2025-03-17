import { Question } from "./Question";

export default interface SequenceQuestion {
  id: number;
  order: number;
  question: Question;
}
