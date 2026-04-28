"use client";

import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Box, Button, Typography } from "@mui/material";
import { useMicVAD } from "@ricky0123/vad-react";

export default function Recorder() {
  // custom webhook to stream audio while recording.
  // not the most efficient way to do this, but there are no other way i found.
  const { start, stop, cancel, isRecording } = useVoiceRecorder(
    "ws://localhost:8765",
    useMicVAD({
      baseAssetPath: "/vad/", // or whatever you want
      onnxWASMBasePath: "/vad/", // or whatever you want
      onSpeechEnd: (audio) => {
        handleStop();
      },
      startOnLoad: false,
    }),
  );

  // speech detector.

  const handleStop = () => {
    stop();
  };

  const handleStart = () => {
    start();
  };

  const handleCancel = () => {
    cancel();
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
    >
      <Typography variant="h1">
        {isRecording ? "recording" : "not recording"}
      </Typography>

      <Button onClick={handleStart} variant="contained">
        start recording
      </Button>
      <Button onClick={handleStop} variant="contained" color="secondary">
        stop recording
      </Button>
      <Button onClick={handleCancel} variant="contained" color="error">
        cancel recording
      </Button>
    </Box>
  );
}
