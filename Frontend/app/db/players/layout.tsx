"use client";

import { Card, CardBody } from "@heroui/react";

export default function PlayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-start h-screen py-4 gap-4 px-2 max-h-screen overflow-y-hidden">
      <Card className="w-full flex flex-row items-center justify-start max-w-5xl h-[64px] min-h-[64px] sticky top-0 z-10">
        <CardBody>
          <div className="text-2xl font-bold">Gracze</div>
        </CardBody>
      </Card>
      <div className="w-full h-full max-w-4xl max-h-[calc(100vh-64px)]">
        {children}
      </div>
    </div>
  );
}
