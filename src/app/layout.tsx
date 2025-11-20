import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeHtmlWrapper from "./ThemeHtmlWrapper";

export const metadata = {
  title: "MiProyecto",
  description: "Aplicación PWA en Next.js",
  manifest: "/manifest.webmanifest",
  icons: [
    { rel: "icon", url: "/icons/icon-192x192.png" },
    { rel: "apple-touch-icon", url: "/icons/icon-512x512.png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <ThemeHtmlWrapper>
        <body className="min-h-screen flex flex-col" suppressHydrationWarning>
          <ThemeProvider>
            <Header />
            <Navbar />

            <main className="flex-1 p-6">{children}</main>

            <Footer />
          </ThemeProvider>
        </body>
      </ThemeHtmlWrapper>
    </html>
  );
}
