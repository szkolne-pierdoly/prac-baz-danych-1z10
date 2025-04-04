"use server";

import { Sequence } from "../models/Sequence";
import { SequenceQuestion } from "../models/SequenceQuestion";

export async function createSequence(
  name: string,
  questionIds: number[],
): Promise<{
  isSuccess: boolean;
  message: string;
  sequence?: Sequence;
}> {
  const body = JSON.stringify({
    name: name,
    questionIds: questionIds,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sequences`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to create sequence" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequence created successfully",
    sequence: data.sequence,
  };
}

export async function getSequences(
  includeQuestions?: boolean,
  search?: string,
  page?: number,
  pageSize?: number,
): Promise<{
  isSuccess: boolean;
  message: string;
  sequences?: Sequence[];
  totalItems?: number;
}> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/sequences`;
  const params = new URLSearchParams();

  if (includeQuestions !== undefined) {
    params.append("includeQuestions", String(includeQuestions));
  }
  if (search) {
    params.append("search", search);
  }
  if (page !== undefined) {
    params.append("page", String(page));
  }
  if (pageSize !== undefined) {
    params.append("pageSize", String(pageSize));
  }

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get sequences" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequences fetched successfully",
    sequences: data.sequences,
    totalItems: data.totalItems,
  };
}

export async function getAllSequences(includeQuestions?: boolean): Promise<{
  isSuccess: boolean;
  message: string;
  sequences?: Sequence[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences${
      includeQuestions ? "?includeQuestions=true" : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get sequences" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequences fetched successfully",
    sequences: data.sequences,
  };
}

export async function getSequence(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  sequence?: Sequence;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get sequence" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequence fetched successfully",
    sequence: data.sequence,
  };
}

export async function getSequenceQuestions(id: number): Promise<{
  isSuccess: boolean;
  message: string;
  part1?: SequenceQuestion[];
  part2?: SequenceQuestion[];
  part3?: SequenceQuestion[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}/questions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to get sequence questions" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequence questions fetched successfully",
    part1: data.part1,
    part2: data.part2,
    part3: data.part3,
  };
}

export async function getSequenceQuestionsPart(
  id: number,
  part: number,
): Promise<{
  isSuccess: boolean;
  message: string;
  questions?: SequenceQuestion[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}/part/${part}/questions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return {
      isSuccess: false,
      message: "Failed to get sequence questions part",
    };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequence questions part fetched successfully",
    questions: data.questions,
  };
}

export async function updateSequence(
  id: number,
  name: string | null,
  questionIds: number[] | null,
): Promise<{
  isSuccess: boolean;
  message: string;
  sequence?: Sequence;
}> {
  const body = JSON.stringify({
    name: name,
    questionIds: questionIds,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}`,
    {
      method: "PUT",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      return { isSuccess: false, message: "Sequence not found" };
    }
    return { isSuccess: false, message: "Failed to update sequence" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: "Sequence updated successfully",
    sequence: data.sequence,
  };
}

export async function deleteSequence(id: number): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to delete sequence" };
  }

  return { isSuccess: true, message: "Sequence deleted successfully" };
}

export async function updateQuestionInSequenceActions(
  id: number,
  part: number,
  questionIndex: number,
  questionId: number,
): Promise<{
  isSuccess: boolean;
  message: string;
  question?: SequenceQuestion;
}> {
  const body = JSON.stringify({
    QuestionId: questionId,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}/part/${part}/question/${questionIndex}`,
    {
      method: "PUT",
      body: body,
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

export async function reorderQuestionInSequenceActions(
  id: number,
  part: number,
  questionIndex: number,
  newPosition: number,
): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const body = JSON.stringify({
    MoveTo: newPosition,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}/part/${part}/questions/${questionIndex}/reorder`,
    {
      method: "PUT",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to reorder question" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: data.message || "Question reordered successfully",
  };
}

export async function cleanSequencePartOrderActions(
  id: number,
  part: number,
): Promise<{
  isSuccess: boolean;
  message: string;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sequences/${id}/part/${part}/clean`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to clean sequence part order" };
  }

  const data = await res.json();

  return {
    isSuccess: true,
    message: data.message || "Sequence part order cleaned successfully",
  };
}
