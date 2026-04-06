import type { Metadata } from "next";
import { Geist, Geist_Mono, Maname } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ServiceSelector from "@/components/ServiceSelector";
import ThemeRegistry from "@/components/ThemeRegistry";

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
            <Box display={"flex"} sx={{ height: "100vh" }}>
              <SideBar />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* the subasa logo and model selection section.*/}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                    position: "absolute",
                  }}
                >
                  {/*the subsa logo part*/}
                  <Box
                    sx={{
                      alignItems: "center",
                      width: "100%",
                      px: 2,
                    }}
                  >
                    The Subasa
                  </Box>

                  {/*the model selection part*/}
                  <ServiceSelector />
                </Box>

                {/* the children section (most probably the chat section)*/}
                <Box
                  sx={{
                    flex: 1,
                    overflow: "auto",
                    minHeight: 0,
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
