"use client";

import SideBar from "@/components/Sidebar";
import { Box } from "@mui/material";
import ServiceSelector from "@/components/ServiceSelector";
import AuthGuard from "@/components/AuthGuard";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              position: "absolute",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                width: "100%",
                px: 2,
              }}
            >
              The Subasa
            </Box>

            <ServiceSelector />
          </Box>

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
    </AuthGuard>
  );
}
