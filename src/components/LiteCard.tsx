import { Box, BoxProps } from "@mui/material";

export default function LiteCard({ children, sx, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        // background: "#696464",
        border: "1px solid #A1A1A1",
        padding: "16px",
        borderRadius: "8px",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
