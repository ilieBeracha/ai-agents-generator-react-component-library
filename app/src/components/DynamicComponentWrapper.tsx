import { useState } from "react";
import { Code } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { GenerationsInDB } from "@/types/agent";
import { DynamicComponent } from "./DynamicComponent";

const formatCode = (code: string) => {
  try {
    return code
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\s+/g, " ")
      .replace(/({)/g, "$1\n  ")
      .replace(/(})/g, "\n$1")
      .replace(/;/g, ";\n")
      .replace(/\/\//g, "\n//");
  } catch {
    return code;
  }
};

export function DynamicComponentWrapper({
  generations,
}: {
  generations: GenerationsInDB[];
}) {
  const [viewStates, setViewStates] = useState<
    Record<number, "component" | "code">
  >(
    generations.reduce(
      (acc, _, index) => ({ ...acc, [index]: "component" }),
      {}
    )
  );

  const toggleView = (index: number) => {
    setViewStates((prev) => ({
      ...prev,
      [index]: prev[index] === "component" ? "code" : "component",
    }));
  };

  return (
    <div className="columns-1 sm:columns-2 gap-6 space-y-6 p-4">
      {generations.map((generation, index) => (
        <div
          key={index}
          className="break-inside-avoid-column bg-gray-200 rounded-xl shadow-md p-6 relative inline-block w-full"
        >
          {/* Toggle Button */}
          <button
            onClick={() => toggleView(index)}
            className="absolute top-2 right-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label={
              viewStates[index] === "component" ? "Show code" : "Show component"
            }
          >
            <Code className="h-4 w-4" />
          </button>

          {/* Component Title */}
          <div className="mb-4 text-lg font-semibold text-gray-800">
            {generation.componentName} | {generation.componentType}
          </div>

          <div className="mt-6">
            {viewStates[index] === "component" ? (
              <div className="flex items-center justify-center w-full">
                <DynamicComponent html={generation.resultCode} />
              </div>
            ) : (
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 whitespace-pre-wrap break-words">
                  <code className="block min-w-full">
                    <CodeEditor
                      code={formatCode(generation.resultCode)}
                      handleChange={() => {}}
                    />
                  </code>
                </pre>
              </div>
            )}
          </div>

          {/* Notes Section */}
          {generation.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
              <p className="text-sm text-gray-600">{generation.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
