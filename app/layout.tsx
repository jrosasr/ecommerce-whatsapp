import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/components/theme-provider";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LunaTV",
  description:
    "La mejor plataforma de streaming en la web, con la mejor calidad y la mejor experiencia de usuario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`${comfortaa.className} bg-neutral-950 dark`}>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
