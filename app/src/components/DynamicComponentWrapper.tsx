import { DynamicComponent } from "./DynamicComponent";

export function DynamicComponentWrapper({ generations }: { generations: any }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {generations.map((generation: any) => (
        <DynamicComponent code={generation.resultCode} />
      ))}
    </div>
  );
}
