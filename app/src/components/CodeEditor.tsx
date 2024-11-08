import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";

export function CodeEditor({
  code,
  handleChange,
}: {
  code: string;
  handleChange: (code: string | undefined) => void;
}) {
  const [editorHeight, setEditorHeight] = useState(200); // Default height
  const editorRef = useRef<any>(null);

  useEffect(() => {
    updateHeight();
  }, [code]);
  // Adjust height based on content
  const updateHeight = () => {
    if (editorRef.current) {
      const lineHeight = editorRef.current.getOption(38); // 38 is the line height option
      const lineCount = editorRef.current.getModel()?.getLineCount() || 1;
      const newHeight = lineHeight * lineCount + 20; // Adding extra padding
      setEditorHeight(Math.max(newHeight, 400)); // Minimum height of 200px
    }
  };

  return (
    <div className="h-full">
      <Editor
        value={code}
        language="typescript"
        height={`${editorHeight}px`}
        onChange={handleChange}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          roundedSelection: true,
          folding: true,
          readOnly: true,
          smoothScrolling: true,
          padding: { top: 20 },
          autoIndent: "full",
          lineNumbers: "off",
        }}
        onMount={(editor) => {
          editorRef.current = editor;
          updateHeight(); // Set initial height
          editor.onDidChangeModelContent(() => updateHeight()); // Update height on content change
        }}
      />
    </div>
  );
}
