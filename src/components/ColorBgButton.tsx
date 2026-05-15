import { Button, ButtonProps } from "@mui/material";

export default function ColorBgButton({ children, sx, ...props }: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={[(theme) => ({}), ...(Array.isArray(sx) ? sx : [sx])]}
      // sx={{
      //   color: "#3F3E3E",
      //   borderRadius: "9999px",
      //   width: "fit-content",
      //   textTransform: "none",
      //   ...sx,
      // }}
      {...props}
    >
      {children}
    </Button>
  );
}
