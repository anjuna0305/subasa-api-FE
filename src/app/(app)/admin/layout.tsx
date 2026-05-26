import AuthGuard from "@/components/AuthGuard";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function AdminLayout({ children }: Props) {
  return <AuthGuard>{children}</AuthGuard>;
}
