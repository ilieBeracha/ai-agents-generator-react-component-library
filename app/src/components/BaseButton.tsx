export default function BaseButton({
  children,
  type,
  onClick,
}: {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="rounded-md bg-kicker px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-kicker/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kicker"
    >
      {children}
    </button>
  );
}
