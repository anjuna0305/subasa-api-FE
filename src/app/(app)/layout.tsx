"use client";

import SideBar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { isAdmin, useAuth } from "@/contexts/AuthContext";
import { Service } from "@/types/service";
// import { useIsMounted } from "@/hooks/useIsMounted";

const publicServicesPrefix = "/p";
const publicServices: Service[] = [
  {
    id: 1,
    serviceDisplayName: "Chatbot",
    serviceCodeName: "subasa-chatbot",
    path: publicServicesPrefix + "/chatbot",
  },
  {
    id: 2,
    serviceDisplayName: "ASR",
    serviceCodeName: "subasa-asr",
    path: publicServicesPrefix + "/asr",
  },
  {
    id: 3,
    serviceDisplayName: "TTS",
    serviceCodeName: "subasa-tts",
    path: publicServicesPrefix + "/tts",
  },
  {
    id: 4,
    serviceDisplayName: "Gov-chatbot",
    serviceCodeName: "goverment-chatbot",
    path: publicServicesPrefix + "/gov-chatbot",
  },
  {
    id: 5,
    serviceDisplayName: "Make your own chatbot",
    serviceCodeName: "make-chatbot",
    path: publicServicesPrefix + "/make-chatbot",
  },
  {
    id: 6,
    serviceDisplayName: "Voice stream test",
    serviceCodeName: "voice-stream",
    path: publicServicesPrefix + "/voice-stream",
  },
];

const adminServices: Service[] = [
  ...publicServices,
  {
    id: 101,
    serviceDisplayName: "Dashboard",
    serviceCodeName: "admin-dashboard",
    path: "/admin",
  },
  {
    id: 102,
    serviceDisplayName: "Custom Chatbots",
    serviceCodeName: "admin-custom-chatbot",
    path: "/admin/custom-chatbot",
  },
  {
    id: 103,
    serviceDisplayName: "Organization",
    serviceCodeName: "organization",
    path: "/admin/organizations",
  },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { role } = useAuth();
  // const isMounted = useIsMounted();

  const admin = isAdmin(role);
  const services = admin ? adminServices : publicServices;

  return (
    <Box display={"flex"} sx={{ height: "100vh" }}>
      <SideBar services={services} />
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
            flex: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
