"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import SequenceQuestion from "@/app/models/SequenceQuestion";
import { useCallback, useEffect, useState } from "react";
import { getSequenceQuestionsPart } from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import QuestionDetailsModal from "@/app/components/questionDetailsModal";

export default function FirstPartView({ sequenceId }: { sequenceId: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState<
    number | null
  >(null);

  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);
  const [focusedQuestion, setFocusedQuestion] =
    useState<SequenceQuestion | null>(null);

  const fetchQuestions = useCallback(async () => {
    const result = await getSequenceQuestionsPart(sequenceId, 1);
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
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">
        Pierwsza część zawsze składa sie z 20 pytań. Każdy gracz odpowiada na 2
        z nich. Wymagane jest dokładnie 20 pytań.
      </p>
      <Divider />
      <div className="text-xl font-bold">Pytania:</div>
      {[...Array(20)].map((_, index) => (
        <Card
          key={index}
          className={`rounded-sm ${index === 0 ? "rounded-t-xl" : index === 19 ? "rounded-b-xl" : ""} flex flex-row justify-start items-center h-12`}
          isPressable
          onPress={() => setFocusedQuestionIndex(index + 1)}
        >
          <CardBody className="bg-white/5 w-12 text-center text-lg font-bold">
            {index + 1}
          </CardBody>
          <Divider orientation="vertical" />
          <CardBody className="bg-white/5">
            {questions.find((question) => question.order === index + 1)
              ?.question.content ?? (
              <span className="text-red-400">No question</span>
            )}
          </CardBody>
        </Card>
      ))}
      <QuestionDetailsModal
        isOpen={focusedQuestionIndex !== null}
        onClose={() => setFocusedQuestionIndex(null)}
        question={focusedQuestion?.question ?? null}
        onSave={() => {
          fetchQuestions();
          setFocusedQuestionIndex(null);
        }}
        sequenceId={sequenceId}
        focusedQuestionIndex={focusedQuestionIndex ?? 0}
      />
      <LoadingDialog isLoading={isLoading} />
    </div>
  );
}
