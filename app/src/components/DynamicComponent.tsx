import React, { useMemo } from "react";
import * as Babel from "@babel/standalone";

export function DynamicComponent({ code }: { code: string }) {
  console.log("code", code);
  const formattedCode = formatGeneratedCode(code);
  const transformedCode: any = useMemo(
    () => transformCode(formattedCode),
    [formattedCode]
  );

  const Component = useMemo(
    () => createComponent(transformedCode),
    [transformedCode]
  );

  return Component ? <Component /> : null;
}

function formatGeneratedCode(code: string) {
  return code?.replace(/\\n/g, "\n").replace(/\\"/g, '"');
}

function transformCode(code: string) {
  return Babel.transform(code || "", {
    presets: ["react"],
  }).code;
}

function createComponent(code: string) {
  if (!code) return null;
  try {
    const componentFunction = new Function("React", `return (${code});`);
    const Component = componentFunction(React);
    return (props: any) => <Component {...props} />;
  } catch (error) {
    console.error("Error generating component:", error);
    return null;
  }
}
