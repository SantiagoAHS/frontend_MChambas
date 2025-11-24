import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from "react";

// ⬇️ Registro SW directamente
function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("SW registrado:", reg))
          .catch((err) => console.error("Error registrando SW:", err));
      });
    }
  }, []);

  return null;
}

export const metadata = {
  title: "MiProyecto",
  description: "Aplicación PWA en Next.js",
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/icons/logox192.png" },
    { rel: "apple-touch-icon", url: "/icons/logox512.png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <SWRegister />
          <Header />
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
