"use client";

import { Box, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { VoiceChat } from "@mui/icons-material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import LiteCard from "./LiteCard";
import InvisibleInput from "./InvisibleInput";
import { Message } from "@/types/message";
import MessageBox from "./MessageBox";
import { API_ENDPOINTS } from "@/utils/api";
import { CustomChatbot } from "@/types/custom-chatbot";

interface Props {
  chatbotData: CustomChatbot;
  heroImageUrl: string;
}

const sendCustomMessage = async (
  message: string,
  retrievalKey: string,
): Promise<string> => {
  const response = await fetch(API_ENDPOINTS.CUSTOM_CHATBOT_API(retrievalKey), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
  return data.response as string;
};

export default function CustomChatShell({ chatbotData, heroImageUrl }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingAllowed] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateMessage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    setIsSending(true);
    const sendingMessage = message.trim();
    if (!sendingMessage) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: sendingMessage, role: "user" },
    ]);
    setMessage("");

    try {
      const response = await sendCustomMessage(
        sendingMessage,
        chatbotData.retrieval_key,
      );
      if (response) displayResponse(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const displayResponse = (response: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: response,
        role: "bot",
      },
    ]);
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
          <Box
            component="img"
            src={heroImageUrl}
            alt={chatbotData.chatbot_name}
            sx={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: 2,
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            {chatbotData.chatbot_name}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {chatbotData.description}
          </Typography>
        </Box>
      )}

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
            <MessageBox messageObject={msg} key={msg.id} />
          ))}
          <div ref={bottomRef} />
        </Box>
      )}

      <LiteCard
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
          <Box sx={{ height: "3rem", display: "flex" }}>
            {message === "" ? (
              <IconButton sx={{ ml: 1 }} color="primary" onClick={handleSend}>
                <VoiceChat />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={isSending}
              >
                <SendIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </LiteCard>
    </Box>
  );
}
