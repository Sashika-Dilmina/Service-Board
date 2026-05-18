import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mini Service Board | Professional Service Requests",
  description: "Connect with service providers and manage your requests easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>
        <footer className="border-t border-slate-200 py-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} ServiceBoard. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
