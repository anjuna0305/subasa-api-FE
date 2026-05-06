"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Stack,
  Input,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ColorBgButton from "@/components/ColorBgButton";
import ColorBgIconButton from "@/components/ColorBgIconButton";
import { API_ENDPOINTS } from "@/utils/api";
import { useAlert } from "@/contexts/AlertContext";
import { CustomChatbot } from "@/types/custom-chatbot";

export default function CustomChatbotDetailPage() {
  const router = useRouter();
  const params = useParams();
  const chatbotId = Number(params.id);
  const { addAlert } = useAlert();

  const [chatbot, setChatbot] = useState<CustomChatbot | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<File | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [togglingPublish, setTogglingPublish] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const fetchChatbot = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        API_ENDPOINTS.CUSTOM_CHATBOT_DETAIL(chatbotId),
        { credentials: "include" },
      );
      if (!response.ok) throw new Error("Failed to fetch chatbot");
      const data: CustomChatbot = await response.json();
      setChatbot(data);
    } catch {
      addAlert("error", "Failed to load chatbot details");
    } finally {
      setLoading(false);
    }
  }, [chatbotId, addAlert]);

  useEffect(() => {
    fetchChatbot();
  }, [fetchChatbot]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      addAlert("error", "Please select an image file");
      return;
    }
    setSelectedFile(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch(
        API_ENDPOINTS.CUSTOM_CHATBOT_UPLOAD_IMAGE(chatbotId),
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Upload failed");
      const updated: CustomChatbot = await response.json();
      setChatbot(updated);
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      addAlert("success", "Hero image uploaded successfully");
    } catch {
      addAlert("error", "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const heroImageSrc = chatbot?.hero_image
    ? API_ENDPOINTS.CUSTOM_CHATBOT_IMAGE(chatbot.hero_image)
    : null;

  const handleDocSelect = () => {
    docInputRef.current?.click();
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["text/plain", "application/pdf"];
    if (!allowed.includes(file.type)) {
      addAlert("error", "Only .txt and .pdf files are allowed");
      return;
    }
    setSelectedDoc(file);
  };

  const handleDocUpload = async () => {
    if (!selectedDoc) return;
    setUploadingDoc(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedDoc);
      const response = await fetch(
        API_ENDPOINTS.CUSTOM_CHATBOT_UPLOAD_FILE(chatbotId),
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Upload failed");
      setSelectedDoc(null);
      if (docInputRef.current) docInputRef.current.value = "";
      addAlert("success", "File uploaded successfully");
    } catch {
      addAlert("error", "Failed to upload file");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleTogglePublish = async () => {
    setTogglingPublish(true);
    try {
      const path =
        chatbot && chatbot.is_publish
          ? API_ENDPOINTS.CUSTOM_CHATBOT_UNPUBLISH(chatbotId)
          : API_ENDPOINTS.CUSTOM_CHATBOT_PUBLISH(chatbotId);

      const response = await fetch(path, {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update");
      const updated: CustomChatbot = await response.json();
      setChatbot(updated);
      addAlert(
        "success",
        updated.is_publish ? "Chatbot published" : "Chatbot unpublished",
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

  if (!chatbot) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Chatbot not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: "800px", mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <ColorBgIconButton
          tooltip="Back to list"
          onClick={() => router.push("/admin/custom-chatbot")}
        >
          <ArrowBackIcon />
        </ColorBgIconButton>
        <Typography variant="h5" fontWeight={600} sx={{ ml: 1 }}>
          Chatbot Details
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Name
              </Typography>
              <Typography variant="h6">{chatbot.chatbot_name}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Description
              </Typography>
              <Typography>{chatbot.description}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                URL Path
              </Typography>
              <Typography>
                <Typography
                  component="a"
                  href={`/chat/${chatbot.url_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  /chat/{chatbot.url_path}
                </Typography>
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Retrieval Key
              </Typography>
              <Typography sx={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                {chatbot.retrieval_key}
              </Typography>
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
                label={chatbot.is_publish ? "Published" : "Unpublished"}
                color={chatbot.is_publish ? "success" : "default"}
                size="small"
              />
              <ColorBgButton
                size="small"
                onClick={handleTogglePublish}
                disabled={togglingPublish}
                variant="contained"
                color={chatbot.is_publish ? "warning" : "success"}
                sx={{ ml: 1 }}
              >
                {togglingPublish
                  ? "Updating..."
                  : chatbot.is_publish
                    ? "Unpublish"
                    : "Publish"}
              </ColorBgButton>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Created
              </Typography>
              <Typography>
                {new Date(chatbot.created_at).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Hero Image
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Box
              component="img"
              src={preview || heroImageSrc || ""}
              alt={chatbot.chatbot_name}
              sx={{
                width: 160,
                height: 160,
                objectFit: "cover",
                borderRadius: 2,
                bgcolor: "grey.100",
                display: preview || heroImageSrc ? "block" : "none",
              }}
            />

            {!(preview || heroImageSrc) && (
              <Box
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: 2,
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  No image
                </Typography>
              </Box>
            )}

            <Stack spacing={1}>
              <Input
                inputRef={fileInputRef}
                type="file"
                onChange={handleFileChange}
                sx={{ display: "none" }}
                inputProps={{ accept: "image/*" }}
              />
              <ColorBgButton
                startIcon={<CloudUploadIcon />}
                onClick={handleFileSelect}
                disabled={uploading}
              >
                Select Image
              </ColorBgButton>
              {selectedFile && (
                <ColorBgButton
                  onClick={handleUpload}
                  disabled={uploading}
                  variant="contained"
                  color="primary"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </ColorBgButton>
              )}
            </Stack>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Knowledge Base File
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Upload a .txt or .pdf file for the chatbot knowledge base.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {selectedDoc && (
              <Paper
                variant="outlined"
                sx={{
                  px: 2,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body2">{selectedDoc.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  ({(selectedDoc.size / 1024).toFixed(1)} KB)
                </Typography>
              </Paper>
            )}

            <Stack spacing={1}>
              <Input
                inputRef={docInputRef}
                type="file"
                onChange={handleDocChange}
                sx={{ display: "none" }}
                inputProps={{ accept: ".txt,.pdf" }}
              />
              <ColorBgButton
                startIcon={<CloudUploadIcon />}
                onClick={handleDocSelect}
                disabled={uploadingDoc}
              >
                Select File
              </ColorBgButton>
              {selectedDoc && (
                <ColorBgButton
                  onClick={handleDocUpload}
                  disabled={uploadingDoc}
                  variant="contained"
                  color="primary"
                >
                  {uploadingDoc ? "Uploading..." : "Upload"}
                </ColorBgButton>
              )}
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
