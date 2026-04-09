import { IconButton } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ColorBgIconButton({ children }: Props) {
  return <IconButton>{children}</IconButton>;
}
