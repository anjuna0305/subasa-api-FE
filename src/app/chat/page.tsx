"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import {VoiceChat} from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Typography,
} from "@mui/material";
import { Message } from "@/types/message";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingAllowed] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateMessage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    console.log("value is updated.");
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, role: "user" },
      {
        id: Date.now() + 2,
        text: "this is the message from bot mf",
        role: "bot",
      },
    ]);
    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        width: "100%",
        px: 2,
        mx: "auto",
      }}
    >
      {/* messages area */}
      <Box
        display={messages.length == 0 ? "none" : "flex"}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "90%",
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: msg.role === "user" ? "primary.main" : "grey.200",
                color: msg.role === "user" ? "white" : "text.primary",
              }}
            >
              <Typography>{msg.text}</Typography>
            </Box>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Box>

      {/*text box part*/}
      <Box
        paddingBottom={messages.length == 0 ? 0 : 5}
        sx={{
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          px: 2,
        }}
      >
        <div>icon gonna be down here</div>
        <IconButton sx={{ ml: 1 }} color="primary" onClick={handleSend}>
          <VoiceChat/>
        </IconButton>
        <TextField
          fullWidth
          multiline
          maxRows={6}
          value={message}
          onChange={(event) => updateMessage(event)}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder="Message..."
          variant="outlined"
          disabled={!typingAllowed}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />
        {message === "" ? (
          <div/>
        ) : (
          <IconButton sx={{ ml: 1 }} color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
