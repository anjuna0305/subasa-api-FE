"use client";

import { VoiceRecorder } from "@/utils/voiceStream";
import { useRef, useState } from "react";

export const useVoiceRecorder = (wsUrl: string) => {
  const voiceRef = useRef<VoiceRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const start = async () => {
    voiceRef.current = new VoiceRecorder(wsUrl);
    await voiceRef.current.init();
    voiceRef.current.start();
    setIsRecording(true);
  };

  const stop = () => {
    voiceRef.current?.stop();
    voiceRef.current = null;
    setIsRecording(false);
  };

  const cancel = () => {
    voiceRef.current?.cancel();
    voiceRef.current = null;
    setIsRecording(false);
  };

  return { start, stop, cancel, isRecording };
};
