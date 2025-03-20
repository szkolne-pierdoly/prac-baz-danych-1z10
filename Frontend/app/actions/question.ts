"use server";

import { Question } from "../models/Question";

export async function getQuestions(
  page?: number,
  pageSize?: number,
  search?: string,
): Promise<{
  isSuccess: boolean;
  message: string;
  questions?: Question[];
  totalItems?: number;
}> {
  console.warn(`page: ${page}, pageSize: ${pageSize}, search: ${search}`);
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions?pageSize=${pageSize ?? 10}&page=${page ?? 1}&search=${search ?? ""}`,
  );

  const res = await fetch(url, {
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
    totalItems: data.totalItems,
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

export async function importQuestions(file: File): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const formData = new FormData();
  formData.append("File", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/import`,
    {
      method: "POST",
      body: formData,
    },
  );

  console.error(await res.json());

  if (!res.ok) {
    return {
      isSuccess: false,
      message: `Failed to import questions: ${res.statusText}`,
    };
  }

  return { isSuccess: true, message: "Questions imported successfully" };
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

export async function deleteMultipleQuestions(ids: number[]): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const idsString = ids.join(",");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/questions/${idsString}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to delete questions" };
  }

  return { isSuccess: true, message: "Questions deleted successfully" };
}
