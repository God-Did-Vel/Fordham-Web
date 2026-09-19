import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "@/components/providers/QueryProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import TopProgressBar from "@/components/ui/TopProgressBar";
import SplashScreen from "@/components/ui/SplashScreen";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "Daddy Wealth Hotel and Suites | Premium Luxury Hotel",
  description:
    "Experience unrivalled opulence at Daddy Wealth Hotel and Suites — where world-class hospitality meets timeless elegance.",
  keywords:
    "Daddy Wealth Hotel, Daddy Wealth Suites, luxury hotel Nigeria, premium hotel, five-star hotel",
  openGraph: {
    title: "Daddy Wealth Hotel and Suites",
    description:
      "Experience unrivalled opulence at Daddy Wealth Hotel and Suites — where world-class hospitality meets timeless elegance.",
    siteName: "Daddy Wealth Hotel and Suites",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="font-body bg-background text-foreground antialiased">
        <CustomCursor />
        <TopProgressBar />
        <QueryProvider>
          <SplashScreen>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </SplashScreen>
        </QueryProvider>
      </body>
    </html>
  );
}
