import ColorBgButton from "@/components/ColorBgButton";
import UploadChatBotFile from "@/components/UploadChatBotFile";
import { Typography } from "@mui/material";

export default function MakeChatBot() {
  return (
    <>
      <UploadChatBotFile
      heading={
        <>
          <Typography
            variant="h4"
            paddingTop={1}
            gutterBottom
            paddingBottom={2}
            sx={{ textAlign: "center", fontFamily: "var(--font-maname)" }}
          >
            ඔබේම චැට්බොට් කෙනෙක් නිර්මාණය කරගන්න
          </Typography>
        </>
      }
      />
    </>
  );
}
