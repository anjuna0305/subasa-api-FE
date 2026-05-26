import AsrShell from "@/components/AsrShell";
import { Typography } from "@mui/material";

export default function asr() {
  return (
    <AsrShell
      heading={
        <>
          <Typography
            variant="h4"
            paddingTop={1}
            gutterBottom
            sx={{ textAlign: "center", fontFamily: "var(--font-maname)" }}
          >
            ලියාගැනීමට අවශ්‍ය දේ පවසන්න
          </Typography>
        </>
      }
    ></AsrShell>
  );
}
