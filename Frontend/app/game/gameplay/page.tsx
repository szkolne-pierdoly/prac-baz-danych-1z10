"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDialog from "@/app/components/loadingDialog";
import { validateGameToken } from "@/app/actions/gameplay";
import { addToast } from "@heroui/react";
export default function GameplayPage() {
  const [gameToken, setGameToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleValidateGameToken = useCallback(async () => {
    const token = localStorage.getItem("gameToken");
    setGameToken(token);

    if (!token) {
      router.push("/");
      return;
    }

    const res = await validateGameToken(token);

    if (!res.isSuccess) {
      router.push("/");
      addToast({
        title: "Nieprawidłowy token",
        description: res.message,
        color: "danger",
      });
      return;
    }

    if (!res.isValid) {
      router.push("/");
      addToast({
        title: "Nieprawidłowy token",
        description: "Prosze poprawne zacząć nową grę",
        color: "danger",
      });
      return;
    }

    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    handleValidateGameToken();
  }, [router, handleValidateGameToken]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      <div>GameplayPage</div>
      <div>{gameToken}</div>
      <LoadingDialog isLoading={isLoading} blackBackground={true} />
    </div>
  );
}
