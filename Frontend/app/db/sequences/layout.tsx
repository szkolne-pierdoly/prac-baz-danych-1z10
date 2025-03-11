"use client";

import { useRouter, usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import CreateSequenceModal from "@/app/components/createSequenceModal";

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
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-start justify-start max-w-5xl h-[64px] sticky top-0 z-10">
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
            {sequenceId === null && (
              <Button
                variant="flat"
                color="primary"
                onPress={() => setShowCreateSequenceModal(true)}
              >
                Dodaj sekwencję
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
      <div className="w-full flex flex-col items-start justify-start max-w-screen max-h-[calc(100vh-96px)] overflow-y-scroll">
        {children}
      </div>
      <CreateSequenceModal
        isOpen={showCreateSequenceModal}
        onClose={() => setShowCreateSequenceModal(false)}
      />
    </div>
  );
}
