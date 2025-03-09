"use client";

import { useRouter, usePathname } from "next/navigation";
import HomeIcon from "@/app/assets/icons/HomeIcon";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import CreateSequence from "@/app/components/createSequence";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showCreateSequenceModal, setShowCreateSequenceModal] = useState(false);
  const [sequenceId, setSequenceId] = useState<string | null>(null);

  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length > 3 && pathParts[2] === "sequences") {
      setSequenceId(pathParts[3]);
    } else {
      setSequenceId(null);
    }
  }, [pathname]);

  const handleGoSequences = () => {
    if (sequenceId) {
      router.push("/db/sequences");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl">
        <CardBody className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="default"
              onPress={() => router.push("/")}
              isIconOnly
            >
              <HomeIcon />
            </Button>
            <div
              onClick={handleGoSequences}
              className="text-2xl font-bold cursor-pointer"
            >
              Sekwencje
            </div>
            {sequenceId && (
              <span className="text-2xl font-bold text-gray-500">
                / Sekwencja ID{sequenceId}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              variant="flat"
              color="primary"
              onPress={() => setShowCreateSequenceModal(true)}
            >
              Dodaj sekwencję
            </Button>
          </div>
        </CardBody>
      </Card>
      {children}
      <CreateSequence
        isOpen={showCreateSequenceModal}
        onClose={() => setShowCreateSequenceModal(false)}
      />
    </div>
  );
}