import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { JsonLd } from "@/app/components/ui/JsonLd";

export const metadata: Metadata = {
  title: "UFO Burger — Premium Closed Burgers from Distant Worlds",
  description:
    "Cosmic flavor, premium craft, and limited first access in Wallsend. Join early and be first in line when the hatch opens.",
  metadataBase: new URL("https://ufoburger.com"),
  openGraph: {
    title: "UFO Burger — Premium Closed Burgers",
    description: "Cosmic flavor, premium craft, and limited first access in Wallsend.",
    type: "website",
    url: "https://ufoburger.com",
    siteName: "UFO Burger",
  },
  twitter: {
    card: "summary_large_image",
    title: "UFO Burger — Premium Closed Burgers",
    description: "Cosmic flavor, premium craft, and limited first access in Wallsend.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { en: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(history.scrollRestoration){history.scrollRestoration='manual';}`,
          }}
        />
      </head>
      <body className="antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
