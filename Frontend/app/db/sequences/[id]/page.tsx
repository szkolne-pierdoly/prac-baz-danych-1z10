"use client";

import React from "react";

export default function SequencePage({ params }: { params: { id: string } }) {
  const { id } = React.use(params);

  return <div>SequencePage {id}</div>;
}
