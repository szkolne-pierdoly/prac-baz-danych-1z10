export interface Question {
  id: number;
  content: string;
  variant2: string;
  variant3?: string;
  correctAnswer: string;
  sequencePart: number;
}
