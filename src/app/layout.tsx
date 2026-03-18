import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";
import ScrollWalker from "@/components/ScrollWalker";
import MobilePopup from "@/components/MobilePopup";

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
      <head>
        {/* Synchronously restore desktop viewport before first render */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('rtt_desktop_mode') === 'true') {
                  var m = document.querySelector('meta[name="viewport"]');
                  if (m) m.content = 'width=1280';
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <MobilePopup />
        <CursorTrail />
        <ScrollWalker />
        {children}
      </body>
    </html>
  );
}
