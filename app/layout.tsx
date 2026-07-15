import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "GAME ON | Ultimate Premium Indoor Box Cricket Arena",
  description: "Experience the world's most premium indoor box cricket arena. Features professional turf, LED floodlights, practice nets, corporate matches, and real-time scoreboard. Book your slot in seconds!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white font-sans antialiased overflow-x-hidden selection:bg-[#00FF66] selection:text-[#050505]">
        {children}
      </body>
    </html>
  );
}
