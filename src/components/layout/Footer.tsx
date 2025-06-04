// components/layout/Footer.tsx
"use client";

export default function Footer() {
    return (
        <footer className="w-full px-6 py-4 flex justify-center items-center bg-gray-100 dark:bg-orange-600 shadow mt-8">
            <span className="text-sm text-gray-200 dark:text-gray-300 text-center">
                &copy; {new Date().getFullYear()} MiProyecto. Todos los derechos reservados.
            </span>
        </footer>
    );
}