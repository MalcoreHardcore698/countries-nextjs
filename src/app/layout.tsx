// vendors
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// styles
import "@/styles/globals.scss";

// components
import { SWRProvider } from "@/providers/swr-provider";
import ErrorBoundary from "@/components/common/error-boundary";
import MainLayout from "@/components/common/main-layout";

// fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Countries App",
  description: "Countries App",
  icons: {
    icon: "/favicon.ico",
  },
};

// types
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const className = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html lang="ru">
      <body className={className} suppressHydrationWarning>
        <ErrorBoundary>
          <SWRProvider>
            <MainLayout>{children}</MainLayout>
          </SWRProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export default Layout;
