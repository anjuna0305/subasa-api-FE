import type { Metadata } from "next";
import { Geist, Geist_Mono, Maname } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/ThemeRegistry";
import { AuthProvider } from "@/contexts/AuthContext";
import { AlertProvider } from "@/contexts/AlertContext";
import GlobalAlert from "@/components/GlobalAlert";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const maname = Maname({
  weight: "400",
  variable: "--font-maname",
  subsets: ["sinhala"],
});

export const metadata: Metadata = {
  title: "Subasa Chat App",
  description: "AI solutions provided by Subasa UCSC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${maname.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <AlertProvider>
              <AuthProvider>
                {children}
                <GlobalAlert />
              </AuthProvider>
            </AlertProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
