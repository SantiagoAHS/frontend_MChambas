"use client";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeHtmlWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme(); // 'light' o 'dark'
  return (
    <html lang="es" data-theme={theme}>
      {children}
    </html>
  );
}
