"use client";

import EditIcon from "@/app/assets/icons/EditIcon";
import { TrashIcon } from "@/app/assets/icons/TrashIcon";
import { Question } from "../../models/Question";
import {
  Button,
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2">
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
        <Table>
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Treść</TableColumn>
            <TableColumn>Podpowiedź</TableColumn>
            <TableColumn>Podpowiedź 2</TableColumn>
            <TableColumn>Poprawna Odpowiedź</TableColumn>
            <TableColumn>Akcje</TableColumn>
          </TableHeader>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.id}</TableCell>
                <TableCell>{question.content}</TableCell>
                <TableCell>{question.hint}</TableCell>
                <TableCell>{question.hint2}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
                <TableCell className="flex flex-row gap-4">
                  <Link href={`/db/questions/${question.id}`}>
                    <EditIcon className="text-warning" />
                  </Link>
                  <Link href={`/db/questions/${question.id}`}>
                    <TrashIcon className="text-danger" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
