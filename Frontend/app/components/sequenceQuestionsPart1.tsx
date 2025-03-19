"use client";

import {
  Card,
  CardBody,
  Divider,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import SequenceQuestion from "../models/SequenceQuestion";
import { useCallback, useEffect, useState } from "react";
import { getSequenceQuestionsPart } from "../actions/sequence";
import { ArrowLeftRight, Plus } from "lucide-react";
import SelectPart1QuestionModal from "./selectPart1QuestionModal";

export default function SequenceQuestionsPart1({
  sequenceId,
}: {
  sequenceId: number;
}) {
  const [isShowSelectPart1Question, setIsShowSelectPart1Question] =
    useState(false);

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
      <Modal
        isOpen={focusedQuestionIndex !== null}
        onClose={() => setFocusedQuestionIndex(null)}
      >
        <ModalContent>
          <ModalHeader>Szczegóły pytania nr {focusedQuestionIndex}</ModalHeader>
          <Divider />
          <ModalBody>
            {focusedQuestion ? (
              <div className="flex flex-col gap-2">
                <div>
                  <div className="text-gray-500 text-sm">Pytanie:</div>
                  <div>{focusedQuestion.question.content}</div>
                </div>
                <Divider />
                <div>
                  <div className="text-gray-500 text-sm">
                    Poprawna odpowiedź:
                  </div>
                  <div>{focusedQuestion.question.correctAnswer}</div>
                </div>
                <Divider />
                <div>
                  <div className="text-gray-500 text-sm">Podpowiedź: </div>
                  <div>{focusedQuestion.question.hint}</div>
                </div>
                <Divider />
                <div>
                  <div className="text-gray-500 text-sm">Podpowiedź 2:</div>
                  <div>{focusedQuestion.question.hint2 ?? "-"}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="text-xl font-bold text-center">
                  Brak wybranego pytania
                </div>
                <Button
                  variant="flat"
                  color="primary"
                  fullWidth
                  startContent={<Plus className="outline-none" />}
                  onPress={() => setIsShowSelectPart1Question(true)}
                >
                  Wybierz pytanie
                </Button>
              </div>
            )}
          </ModalBody>
          {focusedQuestion && (
            <>
              <Divider />
              <ModalFooter>
                <Button
                  variant="flat"
                  color="secondary"
                  fullWidth
                  startContent={<ArrowLeftRight className="outline-none" />}
                >
                  Zamień pytanie
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <SelectPart1QuestionModal
        isOpen={isShowSelectPart1Question}
        onClose={() => setIsShowSelectPart1Question(false)}
        onSuccess={() => {}}
        position={focusedQuestionIndex ?? 0}
      />
    </div>
  );
}
