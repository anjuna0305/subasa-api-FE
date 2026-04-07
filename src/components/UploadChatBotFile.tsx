"use client";
import { Box, IconButton, Input, Tooltip, Typography } from "@mui/material";
import LiteCard from "./LiteCard";
import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ColorBgButton from "./ColorBgButton";
import TextFilePngImage from "@/../public/text_file.png";

type UploadedFile = {
  fileName: string | null;
  file: File | null;
  preview: string | null;
};

export default function UploadChatBotFile() {
  const [uploadFile, setUploadFile] = useState<UploadedFile>({
    file: null,
    preview: null,
  } as UploadedFile);
  const dropZone = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (uploadFile.preview) {
        URL.revokeObjectURL(uploadFile.preview);
      }
    };
  }, [uploadFile]);

  useEffect(() => {
    const handleWindowDrop = (e: globalThis.DragEvent) => {
      if (
        e.dataTransfer?.items &&
        [...e.dataTransfer.items].some((item) => item.kind === "file")
      ) {
        e.preventDefault();
      }
    };

    const handleWindowDragOver = (e: globalThis.DragEvent) => {
      if (e.dataTransfer) {
        const fileItems = [...e.dataTransfer.items].filter(
          (item) => item.kind === "file",
        );
        if (fileItems.length > 0) {
          e.preventDefault();
          if (!dropZone.current?.contains(e.target as Node)) {
            e.dataTransfer.dropEffect = "none";
          }
        }
      }
    };

    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("dragover", handleWindowDragOver);

    return () => {
      // when the component unmount, this will call and remove the event listeners.
      window.removeEventListener("drop", handleWindowDrop);
      window.removeEventListener("dragover", handleWindowDragOver);
    };
  }, []);

  const generatePreviewForFile = (file: File): string | null => {
    const url = URL.createObjectURL(file);
    return url ? url : null;
  };

  const handleDragOnDropZone = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer) {
      const fileItems = [...e.dataTransfer.items].filter(
        (item) => item.kind === "file",
      );
      if (fileItems.length > 0) {
        e.preventDefault();
        if (fileItems.some((item) => item.type.startsWith("image/"))) {
          e.dataTransfer.dropEffect = "copy";
        } else {
          e.dataTransfer.dropEffect = "none";
        }
      }
    }
  };

  const testHandleDrop = (event: DragEvent<HTMLDivElement>) => {
    console.log("drop event detected");
    if (event.dataTransfer) {
      const fileItems = [...event.dataTransfer.items].filter(
        (item) => item.kind === "file",
      );
      if (fileItems.length > 0) {
        event.preventDefault();
        if (fileItems.some((item) => item.type.startsWith("image/"))) {
          const dataFile = fileItems[0].getAsFile();
          if (dataFile) {
            setUploadFile({
              fileName: dataFile.name,
              file: dataFile,
              preview: generatePreviewForFile(dataFile),
            });
          }
        }
      }
    }
  };

  const removeImage = () => {
    if (inputRef.current) inputRef.current.value = "";
    setUploadFile({ file: null, preview: null, fileName: null });
  };

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleChangeInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handle change input file called");
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type.startsWith("image/")) {
      setUploadFile({
        fileName: file.name,
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        width: "100%",
        px: 2,
        mx: "auto",
      }}
    >
      <ColorBgButton onClick={handleInputClick}>
        this is the button
      </ColorBgButton>
      <Input
        inputRef={inputRef}
        type="file"
        id="file-input"
        sx={{ display: "none" }}
        onChange={handleChangeInputFile}
      />

      <LiteCard
        sx={{
          width: "600px",
          height: "200px",
          border: "1px solid red",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        onDrop={testHandleDrop}
        ref={dropZone}
        onDragOver={handleDragOnDropZone}
      >
        {uploadFile.file ? (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column-reverse",
            }}
          >
            <Box sx={{ width: "96px" }}>
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={removeImage}
                  sx={{ position: "absolute", top: -20, right: -4 }}
                >
                  <CloseIcon />
                </IconButton>
                <Image
                  src={TextFilePngImage}
                  alt="text_file.png"
                  style={{ width: "auto", height: "80px" }}
                />
              </Box>
              <Tooltip title={uploadFile.fileName}>
                <Typography
                  sx={{
                    maxWidth: 200,
                    maxHeight: 48,
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                >
                  {uploadFile.fileName ? uploadFile.fileName : "random text"}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>this is the dropdown zone</Typography>
          </Box>
        )}

        {uploadFile.file && (
          <Box p={1} sx={{ position: "absolute", bottom: 0, right: 0 }}>
            <ColorBgButton>this is the send button</ColorBgButton>
          </Box>
        )}
      </LiteCard>
    </Box>
  );
}
