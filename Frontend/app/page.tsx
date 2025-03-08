"use client";

import { Card, CardBody, Divider } from "@heroui/react";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-center text-6xl mb-4">Panel operatora</h1>
      <Divider />
      <div className="flex flex-col w-full h-full items-center justify-start max-h-[75vh]">
        <div className="flex flex-col items-center justify-center mt-4 w-full max-w-4xl gap-4">
          <div className="w-full flex flex-col items-center justify-center gap-1">
            <div className="w-full text-2xl font-bold">Baza danych</div>
            <div className="text-sm text-gray-500 w-full">
              Kliknij w kartę aby zobaczyć wiecej informacji.
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-4 w-full max-w-4xl gap-4">
            <Card className="w-full max-w-[25%] min-w-[100px]" isPressable>
              <CardBody>
                <div className="text-2xl font-bold">Pytania: 17</div>
              </CardBody>
            </Card>
            <Card className="w-full max-w-[25%] min-w-[100px]" isPressable>
              <CardBody>
                <div className="text-2xl font-bold">Sekwencje: 4</div>
              </CardBody>
            </Card>
            <Card className="w-full max-w-[25%] min-w-[100px]" isPressable>
              <CardBody>
                <div className="text-2xl font-bold">Gracze: 2</div>
              </CardBody>
            </Card>
            <Card className="w-full max-w-[25%] min-w-[100px]" isPressable>
              <CardBody>
                <div className="text-2xl font-bold">Gry: 4</div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
