"use client";

import { getSequenceQuestionsPart } from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import SequenceQuestion from "@/app/models/SequenceQuestion";
import { Button, Divider } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function SecondPartView({ sequenceId }: { sequenceId: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState<
    number | null
  >(null);

  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);
  const [focusedQuestion, setFocusedQuestion] =
    useState<SequenceQuestion | null>(null);

  const fetchQuestions = useCallback(async () => {
    const result = await getSequenceQuestionsPart(sequenceId, 2);
    if (result.isSuccess) {
      setQuestions(result.questions ?? []);
    } else {
      console.error(result.message);
    }
  }, [sequenceId]);

  useEffect(() => {
    setIsLoading(true);
    fetchQuestions();
    setIsLoading(false);
  }, [fetchQuestions]);

  useEffect(() => {
    if (focusedQuestionIndex) {
      setFocusedQuestion(
        questions.find((question) => question.order === focusedQuestionIndex) ??
          null,
      );
    }
  }, [focusedQuestionIndex, questions]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-500">
        Druga część gry nie ma wymaganej liczby pytań, trwa dopuki nie zostanie
        3 graczy. potem przechodzi sie do finału (części trzeciej)
      </div>
      <Divider />
      <div className="text-xl font-bold">Pytania:</div>
      <div>
        <div>
          {questions.length > 0 ? (
            questions.map((question) => (
              <div key={question.id}>{question.question.content}</div>
            ))
          ) : (
            <div className="text-red-400 text-center text-2xl font-bold mt-2 mb-8">
              Brak pytań!
            </div>
          )}
          <Divider />
          <div className="flex justify-center items-center mt-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => {}}
              startContent={<PlusIcon />}
              className="w-1/3"
            >
              Dodaj pytania
            </Button>
          </div>
        </div>
      </div>
      <LoadingDialog isLoading={isLoading} />
    </div>
  );
}
