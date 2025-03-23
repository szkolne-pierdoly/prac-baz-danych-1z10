"use client";

import {
  cleanSequencePartOrderActions,
  getSequenceQuestionsPart,
} from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import QuestionDetailsModal from "@/app/components/questionDetailsModal";
import { SequenceQuestion } from "@/app/models/SequenceQuestion";
import { Button, Card, CardBody, Divider, Tooltip } from "@heroui/react";
import { PlusIcon, SparklesIcon } from "lucide-react";
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
    setIsLoading(true);
    const result = await getSequenceQuestionsPart(sequenceId, 2);
    if (result.isSuccess) {
      setQuestions((result.questions ?? []).sort((a, b) => a.order - b.order));
    } else {
      console.error(result.message);
    }
    setIsLoading(false);
  }, [sequenceId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    if (focusedQuestionIndex) {
      setFocusedQuestion(
        questions.find((question) => question.order === focusedQuestionIndex) ??
          null,
      );
    }
  }, [focusedQuestionIndex, questions]);

  const cleanOrder = useCallback(async () => {
    setIsLoading(true);
    const result = await cleanSequencePartOrderActions(sequenceId, 2);
    if (result.isSuccess) {
      fetchQuestions().then(() => {
        setIsLoading(false);
      });
    } else {
      console.error(result.message);
      setIsLoading(false);
    }
  }, [sequenceId, fetchQuestions]);

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-gray-500">
        Druga część gry nie ma wymaganej liczby pytań, trwa dopuki nie zostanie
        3 graczy. potem przechodzi sie do finału (części trzeciej)
      </div>
      <Divider />
      <div className="text-xl font-bold mb-2">Pytania:</div>
      <div>
        <div className="flex flex-col gap-1">
          {questions.length > 0 && (
            <>
              {questions.map((question) => (
                <Card
                  key={question.id}
                  className={`rounded-sm ${
                    questions.length === 1
                      ? "rounded-xl"
                      : questions[0].id === question.id
                        ? "rounded-t-xl"
                        : questions[questions.length - 1].id === question.id
                          ? "rounded-b-xl"
                          : ""
                  } flex flex-row justify-start items-center h-12`}
                  isPressable
                  isHoverable
                  onPress={() => {
                    setFocusedQuestionIndex(question.order);
                  }}
                >
                  <CardBody className="bg-white/5 w-12 text-center text-lg font-bold">
                    {question.order}
                  </CardBody>
                  <Divider orientation="vertical" />
                  <CardBody className="bg-white/5">
                    {question.question.content ?? (
                      <span className="text-red-400">No question</span>
                    )}
                  </CardBody>
                </Card>
              ))}
            </>
          )}
          {!isLoading && questions.length === 0 && (
            <>
              <div className="text-red-400 text-center text-2xl font-bold mt-2 mb-8">
                Brak pytań!
              </div>
              <Divider />
            </>
          )}
          <div className="flex justify-center items-center mt-2 gap-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => setFocusedQuestionIndex(questions.length + 1)}
              startContent={<PlusIcon />}
              className="w-1/3"
            >
              Dodaj pytania
            </Button>
            <Tooltip content="Usuń przerwy w kolejności pytań">
              <Button variant="flat" isIconOnly onPress={cleanOrder}>
                <SparklesIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <QuestionDetailsModal
        isOpen={focusedQuestionIndex !== null}
        onClose={() => {
          setFocusedQuestionIndex(null);
        }}
        question={focusedQuestion?.question ?? null}
        onSave={() => {
          fetchQuestions();
        }}
        sequenceId={sequenceId}
        focusedQuestionIndex={focusedQuestionIndex ?? 0}
        part={2}
      />
      <LoadingDialog isLoading={isLoading} />
    </div>
  );
}
