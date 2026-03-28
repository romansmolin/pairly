import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
   <div className="min-h-screen w-full relative bg-white">
  {/* Soft Yellow Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, var(--primary) 0%, transparent 70%)
      `,
      opacity: 0.45,
    }}
  />
     {/* Your Content/Components */}
</div>
  );
};
