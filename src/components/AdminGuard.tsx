import { isAdmin, useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isAuthenticated } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    console.log("user role is: ", role);
    if (!role || !isAdmin(role)) {
      redirected.current = true;
      router.replace("/login");
      // to do, redirect to unauthorized
    }
  }, [isAuthenticated, role, router]);

  if (!role || !isAdmin(role)) return null;
  return <>{children}</>;
}
