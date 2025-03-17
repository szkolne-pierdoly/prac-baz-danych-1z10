export async function getStats(): Promise<{
  isSuccess: boolean;
  status: string;
  message: string;
  data?: {
    totalQuestions: number;
    totalSequences: number;
    totalPlayers: number;
    totalGames: number;
  };
}> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats`);
  if (!response.ok) {
    return {
      isSuccess: false,
      status: response.statusText,
      message: "Failed to fetch stats",
    };
  }
  const data = await response.json();
  return {
    isSuccess: true,
    status: "SUCCESS",
    message: "Stats fetched successfully",
    data: {
      totalQuestions: data.totalQuestions,
      totalSequences: data.totalSequences,
      totalPlayers: data.totalPlayers,
      totalGames: data.totalGames,
    },
  };
}
