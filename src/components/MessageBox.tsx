"use client";

import { Message } from "@/types/message";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  messageObject: Message;
}

export default function MessageBox({ messageObject }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayStop = useCallback(() => {
    if (!messageObject.audioUrl) return;

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(messageObject.audioUrl);
    audioRef.current = audio;

    audio.onplaying = () => setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    audio.play().catch(() => setIsPlaying(false));
  }, [messageObject.audioUrl, isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
          bgcolor:
            messageObject.role === "user" ? "primary.main" : "grey.200",
          color: messageObject.role === "user" ? "white" : "text.primary",
        }}
      >
        <Typography>{messageObject.text}</Typography>
        {messageObject.role === "bot" && messageObject.audioLoading && (
          <Box sx={{ mt: 0.5, display: "flex", alignItems: "center" }}>
            <CircularProgress size={20} />
          </Box>
        )}
        {messageObject.role === "bot" &&
          messageObject.audioUrl &&
          !messageObject.audioLoading && (
            <Box sx={{ mt: 0.5 }}>
              <IconButton
                size="small"
                onClick={handlePlayStop}
                sx={{
                  color: messageObject.role === "bot" ? "primary.main" : undefined,
                }}
              >
                {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
              </IconButton>
            </Box>
          )}
      </Box>
    </Box>
  );
}
