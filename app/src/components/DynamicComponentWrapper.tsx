import { useState } from "react";
import { DynamicComponent } from "./DynamicComponent";
import { Code } from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { GenerationsInDB } from "@/types/agent";

// Helper function to format the code
const formatCode = (code: string) => {
  try {
    // Parse and stringify with indentation
    const parsed = JSON.parse(`{"code": ${code}}`).code;

    // Replace escaped characters
    return (
      parsed
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        // Add proper indentation
        .split("\n")
        .map((line: string) => line.trim())
        .join("\n")
    );
  } catch {
    // Fallback if parsing fails
    return code
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\s+/g, " ")
      .replace(/({)/g, "$1\n  ")
      .replace(/(})/g, "\n$1")
      .replace(/;/g, ";\n")
      .replace(/\/\//g, "\n//");
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
    <div className="rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {generations.map((generation, index) => (
        <div key={index} className="relative bg-white rounded-xl shadow-md p-6">
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

          {/* Component/Code View */}
          <div className="mt-6">
            {viewStates[index] === "component" ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <DynamicComponent code={generation.resultCode} />
              </div>
            ) : (
              <div className="relative">
                <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 whitespace-pre-wrap break-words">
                  <code className="block min-w-full">
                    {/* {formatCode(generation.resultCode)} */}
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
