"use server";

import { Question } from "../models/Question";

export async function getQuestions(): Promise<{
  isSuccess: boolean;
  message: string;
  questions?: Question[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get questions" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Questions fetched successfully",
    questions: data.questions,
  };
}

export async function createQuestion(
  name: string,
  hint: string,
  answer: string,
  hint2?: string,
): Promise<{
  isSuccess: boolean;
  message: string;
  question?: Question;
}> {
  const body = JSON.stringify({
    content: name,
    hint: hint,
    hint2: hint2,
    correctAnswer: answer,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/questions`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to create question" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Question created successfully",
    question: data.question,
  };
}

export async function updateQuestion(question: Question): Promise<{
  isSuccess: boolean;
  message: string;
  question?: Question;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${question.id}`,
    {
      method: "PUT",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to update question" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Question updated successfully",
    question: data.question,
  };
}
export async function deleteQuestion(id: number): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to delete question" };
  }

  return { isSuccess: true, message: "Question deleted successfully" };
}
