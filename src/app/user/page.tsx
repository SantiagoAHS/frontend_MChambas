"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <main className="pt-4 px-4">{children}</main>
      {/* <Footer /> */} {/* Footer import and usage commented out because Footer module does not exist */}
    </div>
  );
}
