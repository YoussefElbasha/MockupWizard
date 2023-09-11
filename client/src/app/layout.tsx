"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar-components/Navbar";
import api from "../../util/Axios";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex flex-col min-h-screen text-white bg-background">
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
