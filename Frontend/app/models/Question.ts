export interface Question {
  id: number;
  content: string;
  hint: string;
  hint2: string | undefined;
  correctAnswer: string;
}
