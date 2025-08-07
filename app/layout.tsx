import type { Metadata } from "next";
import "./globals.css";
// Alterado de next/font/google para next/font/local
import localFont from 'next/font/local'
import { cn } from "@/lib/utils"

// Carregando a fonte Mona Sans localmente
const fontSans = localFont({
  src: '../public/fonts/Mona-Sans.ttf',
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Zylumia",
  description: "Seu site de moda e estilo.",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
