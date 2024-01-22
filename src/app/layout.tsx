import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReduxProvider from "@/providers/ReduxProvider";
import Cart from "@/components/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlazeWear",
  description: "Your own online supermarket.",
  openGraph: {
    images: ['/cover.jpg']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ReduxProvider>
          <Header />
          <Cart />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
