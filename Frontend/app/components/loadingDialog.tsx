"use client";

import { Spinner } from "@heroui/react";

export default function LoadingDialog({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Spinner size="lg" />
    </div>
  ) : null;
}
