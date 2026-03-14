import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rock The Talk | Toastmasters Club #05843628",
  description: "Rock The Talk is a Toastmasters International club chartered October 2016. Empowering communicators and leaders at Trellix, Bangalore. Join us every Thursday.",
  keywords: ["Rock The Talk", "Toastmasters", "public speaking", "leadership", "Bangalore", "Trellix", "communication"],
  openGraph: {
    title: "Rock The Talk — Where Leaders Are Made",
    description: "A decade of confident voices. Join our award-winning Toastmasters club.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
