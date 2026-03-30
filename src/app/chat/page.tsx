"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from "@mui/material";

type Message = {
  id: number;
  text: string;
  role: "user" | "bot";
};

type Model = {
  id: number;
  displayName: string;
  modelName: string;
};

const models: Model[] = [
  {
    id: 1,
    displayName: "model 1",
    modelName: "model1.10",
  },
  {
    id: 2,
    displayName: "model 2",
    modelName: "model2.20",
  },
  {
    id: 3,
    displayName: "model 3",
    modelName: "model3.30",
  },
];

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingAllowed, setTypingAllowed] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<Model>(models[0]);

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

  const handleModelChange = (
    event:
      | ChangeEvent<
          Omit<HTMLInputElement, "value"> & {
            value: string;
          },
          Element
        >
      | (Event & {
          target: {
            value: string;
            name: string;
          };
        }),
  ) => {
    const selectedModel = models.filter(
      (m) => m.modelName == event.target.value,
    );
    setModel(selectedModel[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        px: 2,
        mx: "auto",
      }}
    >
      {/*the subsa logo part*/}
      <Box
        sx={{
          alignItems: "center",
          width: "100%",
          px: 2,
        }}
      >
        The Subasa
      </Box>

      {/*the model selection part*/}
      <Box
        sx={{
          width: "100%",
          px: 2,
        }}
      >
        <Select
          variant="standard"
          disableUnderline
          labelId="selected-model-label"
          id="selected-model-id"
          value={model.modelName}
          onChange={handleModelChange}
        >
          {models.map((m) => (
            <MenuItem key={m.id} value={m.modelName}>
              {m.displayName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* messages area */}
      <Box
        display={messages.length == 0 ? "none" : "flex"}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          flexDirection: "column",
          gap: 2,
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
          <div />
        ) : (
          <IconButton sx={{ ml: 1 }} color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
