import * as React from "react";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
