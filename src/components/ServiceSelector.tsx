"use client";

import { Box } from "@mui/material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { usePathname } from "next/navigation";

const services: Service[] = [
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

export default function ServiceSelector() {
  const pathName = usePathname();
  const [service, setModel] = useState<Service>(
    services.find((s) => s.path === pathName) || services[0],
  );
  const router = useRouter();

  const handleServiceChange = (event: SelectChangeEvent<string>) => {
    const selectedModel = services.find(
      (s) => s.serviceCodeName == event.target.value,
    );
    if (!selectedModel) return;

    setModel(selectedModel);
    if (selectedModel) {
    }
    router.push(selectedModel.path);
  };

  // useEffect(() => {
  //   if (pathName) {
  //     const selectedModel = services.find((s) => s.path == pathName);
  //     if (
  //       selectedModel &&
  //       selectedModel.serviceCodeName !== service.serviceCodeName
  //     ) {
  //       setModel(selectedModel);
  //     }
  //   }
  // }, [pathName]);

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
      }}
    >
      <Select
        variant="standard"
        disableUnderline
        labelId="selected-service-label"
        id="selected-service-id"
        value={service.serviceCodeName}
        onChange={handleServiceChange}
      >
        {services.map((s) => (
          <MenuItem key={s.id + 100} value={s.serviceCodeName}>
            {s.serviceDisplayName}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
