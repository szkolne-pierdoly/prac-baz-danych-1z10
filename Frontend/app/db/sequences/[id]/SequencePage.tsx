"use client";

import { Sequence } from "@/app/models/Sequence";
import {
  Card,
  CardBody,
  Divider,
  Table,
  TableColumn,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from "@heroui/react";
import React from "react";
import { PencilIcon } from "lucide-react";

export default function SequenceClientPage({
  sequence,
}: {
  sequence: Sequence;
}) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl items-center justify-center">
      <Card className="w-full">
        <CardBody className="flex flex-row justify-between items-center">
          <div className="text-2xl font-bold">Sekwencja: {sequence.name}</div>
          <Button variant="faded" color="primary">
            <PencilIcon size={16} />
            Edytuj
          </Button>
        </CardBody>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <div className="text-lg font-bold">Pytania:</div>
          <Table removeWrapper>
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Treść</TableColumn>
              <TableColumn>Podpowiedź</TableColumn>
              <TableColumn>Podpowiedź 2</TableColumn>
              <TableColumn>Odpowiedź</TableColumn>
            </TableHeader>
            <TableBody>
              {sequence.questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.id}</TableCell>
                  <TableCell>{question.content}</TableCell>
                  <TableCell>{question.hint}</TableCell>
                  <TableCell>{question.hint2??"-"}</TableCell>
                  <TableCell>{question.correctAnswer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
