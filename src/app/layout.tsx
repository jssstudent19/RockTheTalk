import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";
import MobilePopup from "@/components/MobilePopup";
import ParrotGame from "@/components/ParrotGame";

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
        {/*
          NO static viewport meta here.
          The inline script runs first and CREATES the tag with the correct
          content before the browser does any layout — so there is no
          initial mobile-width commit followed by a jarring re-layout.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var c = 'width=device-width,initial-scale=1';
              try { if(localStorage.getItem('rtt_desktop_mode')==='true') c = 'width=1280'; } catch(e){}
              var m = document.createElement('meta');
              m.name = 'viewport';
              m.content = c;
              document.head.appendChild(m);
            })();`,
          }}
        />
      </head>
      <body>
        <MobilePopup />
        <CursorTrail />
        <ParrotGame />
        {children}
      </body>
    </html>
  );
}
