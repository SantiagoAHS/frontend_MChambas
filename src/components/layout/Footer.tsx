// components/layout/Footer.tsx
"use client";

export default function Footer() {
    return (
        <footer className="w-full px-6 py-4 flex justify-center items-center bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-md">
            <span className="text-sm text-gray-200 dark:text-white text-center">
                &copy; {new Date().getFullYear()} MiProyecto. Todos los derechos reservados.
            </span>
        </footer>
    );
}