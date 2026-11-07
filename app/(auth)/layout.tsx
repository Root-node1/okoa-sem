import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-canvas p-4 select-none">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
