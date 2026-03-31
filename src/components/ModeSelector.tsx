"use client";

import { Box } from "@mui/material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Service = {
  id: number;
  serviceDisplayName: string;
  serviceCodeName: string;
  path: string;
};

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
];

export default function ServiceSelector() {
  const [service, setModel] = useState<Service>(services[0]);
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

  return (
    <div>
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
    </div>
  );
}
