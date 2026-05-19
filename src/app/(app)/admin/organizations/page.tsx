"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ColorBgButton from "@/components/ColorBgButton";
import ColorBgIconButton from "@/components/ColorBgIconButton";
import { API_ENDPOINTS, parseErrorMessage } from "@/utils/api";
import { useAlert } from "@/contexts/AlertContext";
import AdminGuard from "@/components/AdminGuard";
import { Organization } from "@/types/organizations";

type FormErrors = {
  name?: string;
};

const INITIAL_FORM = {
  name: "",
};

export default function OrganizationsPage() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const { addAlert } = useAlert();

  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.ORGANIZATION_LIST, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }
      const data = await response.json();
      setOrganizations(data);
    } catch {
      addAlert("error", "Failed to load custom organizations");
    } finally {
      setLoading(false);
    }
  }, [addAlert]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) {
      errs.name = "Name is required";
    }
    return errs;
  }

  async function handleSubmit() {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.ORGANIZATION_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name.trim(),
          is_active: false,
        }),
      });
      // if (!response.ok) {
      //   throw new Error("Failed to create organization");
      // }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log("response is not ok");
        const errorMessage = parseErrorMessage(
          errorData,
          `Registration failed with status ${response.status}`,
        );
        throw new Error(errorMessage);
      }

      addAlert("success", "Organization created successfully");
      setDialogOpen(false);
      setForm(INITIAL_FORM);
      setErrors({});
      const data: Organization = await response.json();
      router.push(`organizations/${data.id}`);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to create organization";
      addAlert("error", msg);
    } finally {
      setSubmitting(false);
    }
  }

  function handleCloseDialog() {
    if (submitting) return;
    setDialogOpen(false);
    setForm(INITIAL_FORM);
    setErrors({});
  }

  return (
    <AdminGuard>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Custom chat bots
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ColorBgIconButton
              tooltip="Refresh"
              size="small"
              onClick={fetchOrganizations}
              color="primary"
            >
              <RefreshIcon fontSize="small" />
            </ColorBgIconButton>
            <ColorBgButton
              startIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
            >
              Add new organization
            </ColorBgButton>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Activation state</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow
                    key={org.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/admin/organizations/${org.id}`)
                    }
                  >
                    <TableCell>{org.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={org.is_active ? "Activated" : "Deactivated"}
                        color={org.is_active ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ColorBgIconButton tooltip="View details" size="small">
                        <VisibilityIcon fontSize="small" />
                      </ColorBgIconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add new Organization</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Organization Name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <ColorBgButton
              variant="outlined"
              onClick={handleCloseDialog}
              disabled={submitting}
            >
              Cancel
            </ColorBgButton>
            <ColorBgButton
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create"}
            </ColorBgButton>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminGuard>
  );
}
