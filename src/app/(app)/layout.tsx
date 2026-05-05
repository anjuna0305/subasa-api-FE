"use client";

import SideBar from "@/components/Sidebar";
import { Box } from "@mui/material";
import ServiceSelector from "@/components/ServiceSelector";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/contexts/AuthContext";
import { Service } from "@/types/service";

const generalServices: Service[] = [
  {
    id: 1,
    serviceDisplayName: "Chatbot",
    serviceCodeName: "subasa-chatbot",
    path: "/chat/chatbot",
  },
  {
    id: 2,
    serviceDisplayName: "ASR",
    serviceCodeName: "subasa-asr",
    path: "/chat/asr",
  },
  {
    id: 3,
    serviceDisplayName: "TTS",
    serviceCodeName: "subasa-tts",
    path: "/chat/tts",
  },
  {
    id: 4,
    serviceDisplayName: "Gov-chatbot",
    serviceCodeName: "goverment-chatbot",
    path: "/chat/gov-chatbot",
  },
  {
    id: 5,
    serviceDisplayName: "Make your own chatbot",
    serviceCodeName: "make-chatbot",
    path: "/chat/make-chatbot",
  },
  {
    id: 6,
    serviceDisplayName: "Voice stream test",
    serviceCodeName: "voice-stream",
    path: "/chat/voice-stream",
  },
];

const adminServices: Service[] = [
  {
    id: 1,
    serviceDisplayName: "Chatbot for admins",
    serviceCodeName: "subasa-chatbot for admins",
    path: "/admin",
  },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { role } = useAuth();
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

            <ServiceSelector
              services={role == "admin_user" ? generalServices : adminServices}
            />
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
