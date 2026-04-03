import { Box, BoxProps } from "@mui/material";

export default function LiteCard({ children, sx, ...props }: BoxProps) {
  return (
    <Box sx={{ background: "#ccc", ...sx }} {...props}>
      {children}
    </Box>
  );
}
