"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Message } from "@/types/message";
import TextDisplayBox from "./TextDisplayBox";
import ColorBgIconButton from "./ColorBgIconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MicIcon from "@mui/icons-material/Mic";
import { HideImage, Mic } from "@mui/icons-material";

interface Props {
  heading?: ReactNode;
}

export default function AsrShell({ heading }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>(`
    ඇමෙරිකාව සහ ඉරානය අතර තීරණාත්මක සාම සාකච්ඡා අද (10) පාකිස්තානයේ
    මැදිහත් වීමෙන්, පාකිස්තානයේ ඉස්ලාමාබාද් අගනුවරදී පැවැත්වෙයි. සාම
    සාකච්ඡා හේතුවෙන්, ඉස්ලාමාබාද් අගනුවරට විශේෂ ආරක්ෂාවක් යොදා ඇත. විශේෂ
    රාජ්‍යතාන්ත්‍රික සාකච්ඡා සඳහා පහසුකම් සැලසීම වෙනුවෙන් පාකිස්තා රජය
    විසින් ඉස්ලාමාබාද් නුවරට දින දෙකක රජයේ නිවාඩුවක් ප්‍රකාශයට පත් කර
    ඇතැයි ද වාර්තා වේ. සාකච්ඡා පැවැත්වෙන්නේ ඉස්ලාමාබාද් අගනුවර සෙරීනා
    හෝටලයේය. එය මේවනවිට, පාකිස්තාන රජයේ පාලනය යටතේ පවතී. ආරක්ෂාව තහවුරු
    කිරීම සඳහා හෝටලයේ දැනට රැඳී සිටින සියලුම අමුත්තන්ට වහාම ඉවත් වන ලෙස
    ද දැනුම් දී ඇත. හෝටලය අවට කිලෝමීටර් 3 ක කලාපයක් සම්පූර්ණයෙන්ම
    හුදෙකලා කර ඇති අතර කිසිවකුට එම කලාපයට ප්‍රවේශ වීමට ඉඩ ලැබෙන්නේ නැත.
    අගනුවර වාහන දැඩි ලෙස සෝදිසි කිරීම්වලට ලක්වන බව ද පැවැසෙයි. හෝටලයට
    ඉහළින් ගුවන් කලාපය ද වසා දමා ඇත. ඇමෙරිකාව සහ ඉරානය අතර තීරණාත්මක සාම
    සාකච්ඡා අද (10) පාකිස්තානයේ මැදිහත් වීමෙන්, පාකිස්තානයේ ඉස්ලාමාබාද්
    අගනුවරදී පැවැත්වෙයි. සාම සාකච්ඡා හේතුවෙන්, ඉස්ලාමාබාද් අගනුවරට විශේෂ
    ආරක්ෂාවක් යොදා ඇත. විශේෂ රාජ්‍යතාන්ත්‍රික සාකච්ඡා සඳහා පහසුකම්
    සැලසීම වෙනුවෙන් පාකිස්තා රජය විසින් ඉස්ලාමාබාද් නුවරට දින දෙකක රජයේ
    නිවාඩුවක් ප්‍රකාශයට පත් කර ඇතැයි ද වාර්තා වේ. සාකච්ඡා පැවැත්වෙන්නේ
    ඉස්ලාමාබාද් අගනුවර සෙරීනා හෝටලයේය. එය මේවනවිට, පාකිස්තාන රජයේ පාලනය
    යටතේ පවතී. ආරක්ෂාව තහවුරු කිරීම සඳහා හෝටලයේ දැනට රැඳී සිටින සියලුම
    අමුත්තන්ට වහාම ඉවත් වන ලෙස ද දැනුම් දී ඇත. හෝටලය අවට කිලෝමීටර් 3 ක
    කලාපයක් සම්පූර්ණයෙන්ම හුදෙකලා කර ඇති අතර කිසිවකුට එම කලාපයට ප්‍රවේශ
    වීමට ඉඩ ලැබෙන්නේ නැත. අගනුවර වාහන දැඩි ලෙස සෝදිසි කිරීම්වලට ලක්වන බව
    ද පැවැසෙයි. හෝටලයට ඉහළින් ගුවන් කලාපය ද වසා දමා ඇත.
  `);
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

  const handleCopyToClipBoard = async () => {
    await navigator.clipboard.writeText(responseMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      <Box paddingBottom={2}>
        <ColorBgIconButton tooltip="Start recording">
          <Mic />
        </ColorBgIconButton>
      </Box>

      {/*text box part*/}
      <TextDisplayBox
        // paddingBottom={5}
        sx={{
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          height: "250px",
          px: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            height: "100%",
            width: "100%",
            scrollbarWidth: "none", // Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, Edge
            },
          }}
        >
          <Typography height={"100%"}>{responseMessage}</Typography>
        </Box>
        <Box sx={{ position: "absolute", bottom: "8px", right: "8px" }}>
          <ColorBgIconButton
            tooltip={copied ? "Copied" : "Copy to clipboard"}
            onClick={handleCopyToClipBoard}
          >
            <ContentCopyIcon />
          </ColorBgIconButton>
        </Box>
      </TextDisplayBox>
    </Box>
  );
}
