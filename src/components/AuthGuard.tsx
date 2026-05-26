"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
  roleValidators?: [(role: string) => boolean];
  children: ReactNode;
}

export default function AuthGuard({ children, roleValidators }: Props) {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  let roleAuth = true;

  if (roleValidators && role) {
    let tempAuth = false;
    roleValidators.map((authFunc) => {
      tempAuth = tempAuth || authFunc(role);
    });
    if (!tempAuth) roleAuth = false;
  }

  useEffect(() => {
    if (!roleAuth || (!isAuthenticated && !redirected.current)) {
      redirected.current = true;
      router.replace("/login");
    }
  }, [isAuthenticated, router, roleAuth]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
