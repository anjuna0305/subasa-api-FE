"use client";
import { Message } from "@/types/message";
import { Box, Typography } from "@mui/material";

interface Props {
  messageObject: Message;
}
export default function MessageBox({ messageObject }: Props) {
  return (
    <Box
      key={messageObject.id}
      sx={{
        py: 2,
        display: "flex",
        justifyContent:
          messageObject.role === "user" ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: "90%",
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: messageObject.role === "user" ? "primary.main" : "grey.200",
          color: messageObject.role === "user" ? "white" : "text.primary",
        }}
      >
        <Typography>{messageObject.text}</Typography>
      </Box>
    </Box>
  );
}
