export function DynamicComponent({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="w-full h-full "
    />
  );
}
