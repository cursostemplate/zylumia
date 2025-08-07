import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css"; 
import { cn } from "@/lib/utils"
import { CartProvider } from "@/contexts/cart-context";

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
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
