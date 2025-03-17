"use client";

import AddPlayerDialog from "@/app/components/addPlayerDialog";
import { Button, Card, CardBody } from "@heroui/react";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function PlayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAddPlayerDialogOpen, setIsAddPlayerDialogOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-center justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody className="flex flex-row items-center justify-start gap-2">
          <Button variant="flat" isIconOnly onPress={() => router.push("/")}>
            <HomeIcon />
          </Button>
          <div className="text-2xl font-bold">Gracze</div>
        </CardBody>
        <CardBody className="flex flex-row items-center justify-end gap-2">
          <Button
            variant="flat"
            color="primary"
            onPress={() => setIsAddPlayerDialogOpen(true)}
          >
            Dodaj gracza
          </Button>
        </CardBody>
      </Card>
      <div className="w-full h-full max-w-4xl max-h-[calc(100vh-64px)]">
        {children}
      </div>
      <AddPlayerDialog
        isOpen={isAddPlayerDialogOpen}
        onClose={() => setIsAddPlayerDialogOpen(false)}
        onSuccess={() => setIsAddPlayerDialogOpen(false)}
      />
    </div>
  );
}
