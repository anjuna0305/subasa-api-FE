"use client";

import { Box, TextField, Typography } from "@mui/material";
import ColorBgButton from "@/components/ColorBgButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAlert } from "@/contexts/AlertContext";
import { RegisterRequest } from "@/types/auth";

const REGISTER_API_URL = "PLACEHOLDER";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { addAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const payload: RegisterRequest = { ...data, role: "general_user" };
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail ||
            `Registration failed with status ${response.status}`,
        );
      }

      addAlert("success", "Registration successful! Please sign in.");
      router.push("/login");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      addAlert("error", msg);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          The Subasa
        </Typography>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name")}
              />

              <TextField
                fullWidth
                type="email"
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />

              <ColorBgButton
                type="submit"
                disabled={isSubmitting}
                sx={{ width: "100%" }}
              >
                {isSubmitting ? "Creating account..." : "Sign up"}
              </ColorBgButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
