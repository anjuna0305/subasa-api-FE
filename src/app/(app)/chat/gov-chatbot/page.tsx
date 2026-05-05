import ChatShell from "@/components/ChatShell";
import { Typography } from "@mui/material";
import MaceColorImage from "@/../public/mace_color.png";
import Image from "next/image";

export default function GovernmentChatbot() {
  return (
    <ChatShell
      heading={
        <>
          <Image
            src={MaceColorImage}
            alt="Mace of Sri Lanka"
            style={{ width: "300px", height: "auto" }}
          />
          <Typography
            variant="h4"
            paddingTop={1}
            gutterBottom
            sx={{ textAlign: "center", fontFamily: "var(--font-maname)" }}
          >
            ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජයේ ආණ්ඩුක්‍රම ව්‍යවස්ථාව
          </Typography>
        </>
      }
    />
  );
}
