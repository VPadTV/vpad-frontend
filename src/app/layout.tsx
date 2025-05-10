import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react"; 
import { GlobalContextProvider } from "@/contexts/GlobalContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { Providers } from "@/redux/provider";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "VPad - Visual Artistry Platform",
  description: "A platform for visual artists to showcase their work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={onest.className}>
        <ThemeProvider>
          <Providers>
            <NextUIProvider>
              <GlobalContextProvider>
                <SidebarContextProvider>
                  <Sidebar />
                  <Navbar />
                  {children}
                </SidebarContextProvider>
              </GlobalContextProvider>
            </NextUIProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
