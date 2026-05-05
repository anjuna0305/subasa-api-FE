"use client";

import { Box } from "@mui/material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Service } from "@/types/service";
import { usePathname } from "next/navigation";

interface Props {
  services: Service[];
}

export default function ServiceSelector({ services }: Props) {
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
