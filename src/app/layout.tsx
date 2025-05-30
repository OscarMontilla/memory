import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/miscomponentes/Header";
import AuthCheck from "@/miscomponentes/AuthCheck";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Movemos metadata fuera del componente cliente
export const metadata = {
  title: "Juego Memory",
  description: "Proyecto de juego Memory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthCheck>
          <header>
            <Header />
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer></footer>
        </AuthCheck>
      </body>
    </html>
  );
}
