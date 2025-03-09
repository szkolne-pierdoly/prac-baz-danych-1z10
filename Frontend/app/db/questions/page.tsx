"use client";

import { Question } from "../../models/Question";
import { Button, Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
      fetch(`${apiUrl}/api/questions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}, url: ${apiUrl}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.questions) {
          setQuestions(
            data.questions.map((question: Question) => ({
              id: question.id,
              content: question.content,
              hint: question.hint,
              hint2: question.hint2,
              correctAnswer: question.correctAnswer,
            })),
          );
        } else {
          console.error("Invalid data structure:", data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  });

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="text-2xl font-bold">Pytania</div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button variant="flat" color="default">
              Edytuj
            </Button>
            <Button variant="flat" color="primary">
              Dodaj pytanie
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-4xl">
        {questions.map((question) => (
          <div key={question.id} className="flex flex-row gap-2">
            <div className="text-2xl font-bold">{question.id}</div>
            <div className="text-lg">{question.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
