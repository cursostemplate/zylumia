import type { Metadata } from "next";
import "./globals.css";
// Importando o novo arquivo CSS com as definições @font-face
import "./fonts.css"; 
import { cn } from "@/lib/utils"

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
      {/* A classe 'font-sans' do Tailwind agora aplicará 'Mona Sans' diretamente */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
