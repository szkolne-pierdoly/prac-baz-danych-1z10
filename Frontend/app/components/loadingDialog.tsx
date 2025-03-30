"use client";

import { Spinner } from "@heroui/react";

export default function LoadingDialog({
  isLoading,
  blackBackground = false,
}: {
  isLoading: boolean;
  blackBackground?: boolean;
}) {
  return isLoading ? (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        blackBackground ? "bg-black bg-opacity-100" : "bg-black bg-opacity-50"
      } z-50`}
    >
      <Spinner size="lg" />
    </div>
  ) : null;
}
