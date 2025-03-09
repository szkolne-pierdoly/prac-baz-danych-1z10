import SequenceClientPage from "./SequencePage";

export default async function SequencePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const response = await fetch(`${apiUrl}/api/sequences/${id}`);
  const data = await response.json();
  const sequence = data.sequence;

  return <SequenceClientPage sequence={sequence} />;
}
