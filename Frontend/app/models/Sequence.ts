import { Question } from "./Question";

export interface Sequence {
  id: number;
  name: string;
  questions: Question[];
}
