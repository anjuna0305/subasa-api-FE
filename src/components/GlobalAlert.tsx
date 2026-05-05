"use client";

import { Alert, AlertColor, Box, Collapse, Snackbar } from "@mui/material";
import { useAlert } from "@/contexts/AlertContext";

export default function GlobalAlert() {
  const { alerts, dismissAlert } = useAlert();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: 400,
      }}
    >
      {alerts.map((alert) => (
        <Collapse key={alert.id} in>
          <Alert
            severity={alert.severity as AlertColor}
            onClose={() => dismissAlert(alert.id)}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Collapse>
      ))}
    </Box>
  );
}
