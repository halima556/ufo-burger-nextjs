import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UFO Burger — Premium Closed Burgers from Distant Worlds",
  description:
    "Cosmic flavor, premium craft, and limited first access in Wallsend. Join early and be first in line when the hatch opens.",
  openGraph: {
    title: "UFO Burger",
    description: "Premium Closed Burgers from Distant Worlds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
