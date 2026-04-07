"use client";

import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Box, Button, Typography } from "@mui/material";
import { useMicVAD } from "@ricky0123/vad-react";

export default function Recorder() {
  const { start, stop, cancel, isRecording } = useVoiceRecorder(
    "ws://localhost:8765",
  );

  const vad = useMicVAD({
    baseAssetPath: "/vad/", // or whatever you want
    onnxWASMBasePath: "/vad/", // or whatever you want
    onSpeechEnd: (audio) => {
      console.log("User stopped talking");
    },
  });
  vad.start();

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

      <Button onClick={start} variant="contained">
        start recording
      </Button>
      <Button onClick={stop} variant="contained" color="secondary">
        stop recording
      </Button>
      <Button onClick={cancel} variant="contained" color="error">
        cancel recording
      </Button>
    </Box>
  );
}
