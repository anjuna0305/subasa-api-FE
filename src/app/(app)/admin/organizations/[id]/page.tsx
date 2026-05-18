"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ColorBgButton from "@/components/ColorBgButton";
import ColorBgIconButton from "@/components/ColorBgIconButton";
import { API_ENDPOINTS } from "@/utils/api";
import { useAlert } from "@/contexts/AlertContext";
import AdminGuard from "@/components/AdminGuard";
import { Organization } from "@/types/organizations";

export default function OrganizationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orgId = Number(params.id);
  const { addAlert } = useAlert();

  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [togglingPublish, setTogglingPublish] = useState(false);

  const fetchOrganization = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        API_ENDPOINTS.CUSTOM_ORGANIZATION_DETAIL(orgId),
        { credentials: "include" },
      );
      if (!response.ok) throw new Error("Failed to fetch organization");
      const data: Organization = await response.json();
      setOrg(data);
    } catch {
      addAlert("error", "Failed to load organiazation details");
    } finally {
      setLoading(false);
    }
  }, [orgId, addAlert]);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  const handleToggleActivate = async () => {
    setTogglingPublish(true);
    try {
      const path =
        org && org.is_active
          ? API_ENDPOINTS.ORGANIZATION_DEACTIVATE(orgId)
          : API_ENDPOINTS.ORGANIZATION_ACTIVATE(orgId);

      const response = await fetch(path, {
        method: "PUT",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update");
      const updated: Organization = await response.json();
      setOrg(updated);
      addAlert(
        "success",
        updated.is_active
          ? "Organization activated"
          : "Organization deactivated",
      );
    } catch {
      addAlert("error", "Failed to update publish status");
    } finally {
      setTogglingPublish(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!org) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Organization not found.</Typography>
      </Box>
    );
  }

  return (
    <AdminGuard>
      <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ColorBgIconButton
            tooltip="Back to list"
            onClick={() => router.push("/admin/organizations")}
          >
            <ArrowBackIcon />
          </ColorBgIconButton>
          <Typography variant="h5" fontWeight={600} sx={{ ml: 1 }}>
            Organization Details
          </Typography>
        </Box>

        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="h6">{org.name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={org?.is_active ? "Active" : "Deactive"}
                  color={org?.is_active ? "success" : "default"}
                  size="small"
                />
                <ColorBgButton
                  size="small"
                  onClick={handleToggleActivate}
                  disabled={togglingPublish}
                  variant="contained"
                  color={org?.is_active ? "warning" : "success"}
                  sx={{ ml: 1 }}
                >
                  {togglingPublish
                    ? "Updating..."
                    : org?.is_active
                      ? "deactivate"
                      : "activate"}
                </ColorBgButton>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created
                </Typography>
                <Typography>
                  {new Date(org.created_at).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </AdminGuard>
  );
}
