"use client";

import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";

export default function XmlExamplePage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1>Przykładowy plik XML:</h1>
      <Card>
        <CardBody className="font-mono">
          <pre>
            {`<Questions>
  <Question>
    <Content>What is the capital of France?</Content>
    <Variant2>It's a famous European city.</Variant2>
    <CorrectAnswer>Paris</CorrectAnswer>
  </Question>
  <Question>
    <Content>What is the highest mountain in the world?</Content>
    <Variant2>Located in the Himalayas.</Variant2>
    <CorrectAnswer>Mount Everest</CorrectAnswer>
    <Variant3>Also known as Sagarmatha in Nepal.</Variant3>
  </Question>
  <Question>
    <Content>What is the chemical symbol for water?</Content>
    <Variant2>It's essential for life.</Variant2>
    <CorrectAnswer>H2O</CorrectAnswer>
  </Question>
</Questions>`}
          </pre>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-row items-center justify-center">
          <Button
            variant="flat"
            color="primary"
            onPress={() => window.close()}
            className="px-8"
          >
            Zamknij
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
