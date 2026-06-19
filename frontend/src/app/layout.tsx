import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pakistani Freelance Remittance Optimizer",
  description: "Programmatic SEO directory for remittance optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
                            Remittance Optimizer
                        </span>
                    </div>
                </div>
            </div>
        </nav>
        <main className="pt-24 min-h-[80vh]">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
