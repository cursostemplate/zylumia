import type { Metadata } from "next";
import "./globals.css";
// 1. Importa a fonte 'Mona_Sans' diretamente do 'next/font/google'.
//    Isso instrui o Next.js a otimizar e servir esta fonte.
import { Mona_Sans as FontSans } from 'next/font/google'
import { cn } from "@/lib/utils"

// 2. Configura a fonte, definindo os 'subsets' e uma variável CSS (--font-sans).
//    Esta variável será usada pelo Tailwind CSS.
const fontSans = FontSans({
  subsets: ["latin"],
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
      {/* 3. Aplica a variável da fonte ao corpo do documento.
          A classe 'font-sans' do Tailwind agora usará Mona Sans automaticamente. */}
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
