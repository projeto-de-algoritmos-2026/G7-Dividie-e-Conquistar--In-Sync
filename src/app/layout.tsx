import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jogo de Sintonia | Descubra quem está mais em sintonia",
  description:
    "Um jogo acadêmico que usa o algoritmo de Dividir e Conquistar (Merge Sort) para medir a sintonia entre duplas através de rankings em 5 temas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
