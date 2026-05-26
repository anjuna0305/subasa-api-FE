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
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ColorBgButton from "@/components/ColorBgButton";
import ColorBgIconButton from "@/components/ColorBgIconButton";
import { API_ENDPOINTS } from "@/utils/api";
import { useAlert } from "@/contexts/AlertContext";
import { CustomChatbot } from "@/types/custom-chatbot";
import AdminGuard from "@/components/AdminGuard";
import { Organization } from "@/types/organizations";
import { setFlagsFromString } from "node:v8";

type FormErrors = {
  chatbot_name?: string;
  description?: string;
  url_path?: string;
};

type FormState = {
  chatbot_name: string;
  description: string;
  url_path: string;
  organization_id: number | null;
  is_public: boolean;
};

const INITIAL_FORM: FormState = {
  chatbot_name: "",
  description: "",
  url_path: "",
  organization_id: null,
  is_public: true,
};

export default function CustomChatbotListPage() {
  const router = useRouter();
  const [chatbots, setChatbots] = useState<CustomChatbot[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const { addAlert } = useAlert();

  const fetchChatbots = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOM_CHATBOT_LIST, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chatbots");
      }
      const data = await response.json();
      setChatbots(data);
    } catch {
      addAlert("error", "Failed to load custom chatbots");
    } finally {
      setLoading(false);
    }
  }, [addAlert]);

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
    fetchChatbots();
    fetchOrganizations();
  }, [fetchChatbots, fetchOrganizations]);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.chatbot_name.trim()) {
      errs.chatbot_name = "Name is required";
    }
    if (!form.description.trim()) {
      errs.description = "Description is required";
    }
    if (!form.url_path.trim()) {
      errs.url_path = "URL path is required";
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.url_path.trim())) {
      errs.url_path = "Must be a valid slug (e.g. helpdesk-bot)";
    }
    return errs;
  }

  async function handleSubmit() {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOM_CHATBOT_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          chatbot_name: form.chatbot_name.trim(),
          description: form.description.trim(),
          url_path: form.url_path.trim(),
          organization_id: form.organization_id,
          is_public: "true",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create chatbot");
      }
      addAlert("success", "Chatbot created successfully");
      setDialogOpen(false);
      setForm(INITIAL_FORM);
      setErrors({});
      const data: CustomChatbot = await response.json();
      router.push(`custom-chatbot/${data.id}`);
      // await fetchChatbots();
    } catch {
      addAlert("error", "Failed to create chatbot");
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
              onClick={fetchChatbots}
              color="primary"
            >
              <RefreshIcon fontSize="small" />
            </ColorBgIconButton>
            <ColorBgButton
              startIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
            >
              Add new chatbot
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
                  <TableCell>URL Path</TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chatbots.map((chatbot) => (
                  <TableRow
                    key={chatbot.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(`/admin/custom-chatbot/${chatbot.id}`)
                    }
                  >
                    <TableCell>{chatbot.chatbot_name}</TableCell>
                    <TableCell>{chatbot.url_path}</TableCell>
                    <TableCell>
                      <Chip
                        label={chatbot.is_publish ? "Published" : "Unpublished"}
                        color={chatbot.is_publish ? "success" : "default"}
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
          <DialogTitle>Add new chatbot</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Chatbot Name"
                value={form.chatbot_name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, chatbot_name: e.target.value }))
                }
                error={!!errors.chatbot_name}
                helperText={errors.chatbot_name}
                fullWidth
              />
              <TextField
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="URL Path"
                placeholder="e.g. helpdesk-bot"
                value={form.url_path}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url_path: e.target.value }))
                }
                error={!!errors.url_path}
                helperText={errors.url_path}
                fullWidth
              />
              <Autocomplete
                id="organization-select"
                options={organizations}
                autoHighlight
                onChange={(event, selectedOrg: Organization | null) => {
                  setForm((f) => ({
                    ...f,
                    organization_id: selectedOrg?.id || null,
                  }));
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box
                      key={key}
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...optionProps}
                    >
                      {/*{option.name} ({option.code}) +{option.phone}*/}
                      {option.name}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select organization" />
                )}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.is_public}
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        is_public: e.target.checked,
                      }));
                    }}
                  />
                }
                label="Make chatbot available for public"
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
