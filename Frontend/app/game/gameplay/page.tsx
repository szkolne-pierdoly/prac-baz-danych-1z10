"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDialog from "@/app/components/loadingDialog";

export default function GameplayPage() {
  const [gameToken, setGameToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("gameToken");
    setGameToken(token);

    if (!token) {
      router.push("/");
    }

    setIsLoading(false);
  }, [router]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <div>GameplayPage</div>
      <div>{gameToken}</div>
      <LoadingDialog isLoading={isLoading} blackBackground={true} />
    </div>
  );
}
