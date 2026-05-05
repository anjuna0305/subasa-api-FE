import TtsShell from "@/components/TtsShell";
import { Typography } from "@mui/material";

export default function tts() {
  return (
    <TtsShell
      heading={
        <>
          <Typography
            variant="h4"
            paddingTop={1}
            gutterBottom
            sx={{ textAlign: "center", fontFamily: "var(--font-maname)" }}
          >
            කියවාගැනීමට අවශ්‍ය දේ ලියන්න
          </Typography>
        </>
      }
    />
  );
}
