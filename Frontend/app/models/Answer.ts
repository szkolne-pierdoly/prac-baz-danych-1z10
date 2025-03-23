export interface Answer {
  id: number;
  gameId: number;
  questionId: number;
  answerContent: string;
  isCorrect: boolean;
}
