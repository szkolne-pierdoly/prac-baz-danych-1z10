"use client";

import { Sequence } from "@/app/models/Sequence";
import React from "react";

export default function SequenceClientPage({
  sequence,
}: {
  sequence: Sequence;
}) {
  return (
    <div>
      <div>SequencePage {sequence?.name}</div>
    </div>
  );
}
