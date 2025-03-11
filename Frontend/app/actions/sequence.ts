"use server";

export async function createSequence(name: string, questionIds: number[]) {
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

export async function getAllSequences() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sequences`, {
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
  };
}

export async function getSequence(id: number) {
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

export async function updateSequence(
  id: number,
  name: string,
  questionIds: number[],
) {
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

export async function deleteSequence(id: number) {
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
