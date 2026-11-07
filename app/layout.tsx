import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansUi = Inter({
  subsets: ["latin"],
  variable: "--font-sans-ui",
  display: "swap",
});

const serifDisplay = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

const monoCode = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MCS Academic Workspace | Mathematics & CS Hub",
  description:
    "3-layer academic triage, grading canvas, and lecture consultation portal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansUi.variable} ${serifDisplay.variable} ${monoCode.variable} h-full antialiased`}
    >
      <body className="h-full bg-canvas text-txt-main font-sans selection:bg-surface-3">
        {children}
      </body>
    </html>
  );
}
