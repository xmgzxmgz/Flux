import { PropsWithChildren } from "react";
import { useTheme } from "@/hooks/useTheme";

export function AppProviders({ children }: PropsWithChildren) {
  useTheme();

  return (
    <div className="min-h-dvh bg-bg text-zinc-100">
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </div>
  );
}

