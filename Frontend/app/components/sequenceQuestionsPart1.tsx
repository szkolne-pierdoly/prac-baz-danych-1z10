"use client";

import { Card, CardBody, Divider } from "@heroui/react";
import SequenceQuestion from "../models/SequenceQuestion";
import { useState } from "react";

export default function SequenceQuestionsPart1() {
  const [questions, setQuestions] = useState<SequenceQuestion[]>([]);

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
        >
          <CardBody className="bg-white/5 w-12 text-center text-lg font-bold">
            {index + 1}
          </CardBody>
          <Divider orientation="vertical" />
          <CardBody className="bg-white/5">Card {index + 1}</CardBody>
        </Card>
      ))}
    </div>
  );
}
