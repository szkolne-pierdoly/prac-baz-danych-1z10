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
  Input,
} from "@heroui/react";
import React, { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Question } from "@/app/models/Question";

export default function SequenceClientPage({
  sequence,
}: {
  sequence: Sequence;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSequenceName, setEditingSequenceName] = useState(sequence.name);
  const [editingSequenceQuestionsId, setEditingSequenceQuestionsId] = useState(
    sequence.questions.map((question) => question.id)
  );
  const [selectedQuestions, setSelectedQuestions] = useState<
    "all" | Iterable<React.Key> | undefined
  >(undefined);

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl items-center justify-center">
      <Card className="w-full">
        <CardBody className="flex flex-row justify-between items-center">
          <div className="w-full">
            {isEditing ? (
              <Input
                value={editingSequenceName}
                onChange={(e) => setEditingSequenceName(e.target.value)}
                label="Nazwa sekwencji"
                size="sm"
                className="min-w-96 max-w-96"
              />
            ) : (
              <div className="text-2xl font-bold">
                Sekwencja: {sequence.name}
              </div>
            )}
          </div>
          <Button
            variant="faded"
            color="primary"
            onPress={() => setIsEditing(!isEditing)}
          >
            <PencilIcon size={16} />
            Edytuj
          </Button>
        </CardBody>
        <Divider />
        <CardBody className="flex flex-col gap-2">
          <div className="text-lg font-bold">Pytania:</div>
          <Table
            removeWrapper
            selectionMode={isEditing ? "multiple" : "none"}
            selectedKeys={selectedQuestions}
            onSelectionChange={setSelectedQuestions}
          >
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
                  <TableCell>{question.hint2 ?? "-"}</TableCell>
                  <TableCell>{question.correctAnswer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isEditing && (
            <div className="flex flex-row gap-2">
              {Array.from(selectedQuestions ?? []).length > 0 && (
                <Button variant="flat" color="danger">
                  <TrashIcon size={16} />
                  Usuń pytania
                </Button>
              )}
              <Button variant="flat" color="primary" className="w-full">
                <PlusIcon size={16} />
                Dodaj pytania
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
