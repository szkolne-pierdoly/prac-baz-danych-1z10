"use client";

import { getSequenceQuestionsPart } from "@/app/actions/sequence";
import LoadingDialog from "@/app/components/loadingDialog";
import QuestionDetailsModal from "@/app/components/questionDetailsModal";
import ReorderQuestionModal from "@/app/components/reorderQuestionModal";
import SequenceQuestion from "@/app/models/SequenceQuestion";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function SecondPartView({ sequenceId }: { sequenceId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);

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
                >
                  <CardBody
                    className="bg-white/5 w-12 text-center text-lg font-bold"
                    onClick={() => {
                      setFocusedQuestionIndex(question.order);
                      setShowReorderModal(true);
                    }}
                  >
                    {question.order}
                  </CardBody>
                  <Divider orientation="vertical" />
                  <CardBody
                    className="bg-white/5"
                    onClick={() => {
                      setFocusedQuestionIndex(question.order);
                    }}
                  >
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
          <div className="flex justify-center items-center mt-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => setFocusedQuestionIndex(questions.length + 1)}
              startContent={<PlusIcon />}
              className="w-1/3"
            >
              Dodaj pytania
            </Button>
          </div>
        </div>
      </div>
      <QuestionDetailsModal
        isOpen={focusedQuestionIndex !== null && !showReorderModal}
        onClose={() => setFocusedQuestionIndex(null)}
        question={focusedQuestion?.question ?? null}
        onSave={() => {
          fetchQuestions();
        }}
        sequenceId={sequenceId}
        focusedQuestionIndex={focusedQuestionIndex ?? 0}
        part={2}
      />
      <ReorderQuestionModal
        isOpen={showReorderModal}
        onClose={() => {
          setShowReorderModal(false);
          setFocusedQuestionIndex(null);
        }}
        onSuccess={() => {
          fetchQuestions();
        }}
        sequenceId={sequenceId}
        part={2}
        moveFrom={focusedQuestionIndex ?? 0}
      />
      <LoadingDialog isLoading={isLoading} />
    </div>
  );
}
