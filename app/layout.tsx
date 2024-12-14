import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "./AppProvider";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "CHATVAT",
  description: "YOUR AI COMPANION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
