import GameClientPage from "./gameClientPage";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <GameClientPage gameId={id} />
    </div>
  );
}
