import type { Metadata } from "next";
import {
  Bodoni_Moda,
  IBM_Plex_Mono,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Art by Color",
  description:
    "Discover color palettes by exploring art from the Art Institute of Chicago.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${schibsted.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
