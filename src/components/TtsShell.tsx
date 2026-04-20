"use client";

import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import LiteCard from "./LiteCard";
import InvisibleInput from "./InvisibleInput";
import { Message } from "@/types/message";
import { VoiceChat } from "@mui/icons-material";
import ColorBgButton from "./ColorBgButton";

interface Props {
  heading?: ReactNode;
}

export default function TtsShell({ heading }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingAllowed, setTypingAllowed] = useState(true);
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
      {/* headed area */}
      {messages.length == 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 3,
            alignItems: "center",
            width: "100%",
            maxWidth: "900px",
            px: 2,
          }}
        >
          {heading}
        </Box>
      )}

      {/* messages area */}
      {messages.length > 0 && (
        <Box
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
      )}

      {/*text box part*/}
      <LiteCard
        // paddingBottom={5}
        sx={{
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          px: 2,
        }}
      >
        <InvisibleInput
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
          disabled={!typingAllowed}
        />

        <Box
          sx={{
            height: "3rem",
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          {/* send icon */}
          <Box sx={{ height: "3rem", display: "flex" }}>
            <ColorBgButton>කථනයට හරවන්න</ColorBgButton>
            {/*<IconButton
              color="primary"
              onClick={handleSend}
              disabled={message ? false : true}
            >
              <SendIcon />
            </IconButton>*/}
          </Box>
        </Box>
        {/*<Box
          sx={{ height: "3rem", display: "flex" }}
        >
          {message === "" ? (
            <div />
          ) : (
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          )}
        </Box>*/}
      </LiteCard>
    </Box>
  );
}
