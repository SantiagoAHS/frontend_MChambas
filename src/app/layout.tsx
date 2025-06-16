// app/layout.tsx
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ChatPopup from "./chat/page"; 

export const metadata = {
  title: "MiProyecto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <Header />
        <Navbar />
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
        <ChatPopup />
      </body>
    </html>
  );
}
