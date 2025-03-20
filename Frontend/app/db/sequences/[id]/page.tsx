import SequenceClientPage from "./sequenceClientPage";

export default async function SequencePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <SequenceClientPage sequenceId={id} />
    </div>
  );
}
