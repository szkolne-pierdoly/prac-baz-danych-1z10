"use server";

export async function validateGameToken(token: string): Promise<{
  isSuccess: boolean;
  message: string;
  isValid?: boolean;
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gameplay/token/validate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameToken: token,
      }),
    },
  );

  if (!res.ok) {
    return { isSuccess: false, message: "Failed to validate game token" };
  }

  const data = await res.json();
  console.log(data);
  return {
    isSuccess: true,
    message: "Game token validated successfully",
    isValid: data.isValid,
  };
}
