"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-orange-600 text-white shadow">
      <h1 className="text-xl font-bold">MiProyecto</h1>
      <ul className="flex gap-6">
        <li>
          <Link
            href="/"
            className="hover:underline underline-offset-4"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className="hover:underline underline-offset-4"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:underline underline-offset-4"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/help"
            className="hover:underline underline-offset-4"
          >
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
}
