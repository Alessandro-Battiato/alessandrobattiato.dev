export function Separator({ className, orientation = "horizontal" }: { className?: string; orientation?: "horizontal" | "vertical" }) {
  return (
    <div className={`relative ${className}`}>
      {orientation === "horizontal" ? <div className={`w-full ${className}`} /> : <div className={`h-full ${className}`} />}
    </div>
  );
}
Separator.displayName = "Separator";
