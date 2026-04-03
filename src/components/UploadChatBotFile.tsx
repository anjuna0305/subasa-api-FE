"use client";
import { Box, Button, IconButton, Input } from "@mui/material";
import LiteCard from "./LiteCard";
import { Label } from "@mui/icons-material";
import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";

type UploadedFile = {
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
    setUploadFile({ file: null, preview: null });
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
      <Box>some random text</Box>
      <LiteCard sx={{ width: "600px", height: "200px" }}>
        this is the lite card
      </LiteCard>
      <Input
        inputRef={inputRef}
        type="file"
        id="file-input"
        sx={{ display: "none" }}
        onChange={handleChangeInputFile}
      />
      
      <LiteCard
        sx={{ width: "600px", height: "200px", border: "1px solid red" }}
        onDrop={testHandleDrop}
        ref={dropZone}
        onDragOver={handleDragOnDropZone}
        onClick={handleInputClick}
      >
        this is the dropdown zone
      </LiteCard>
      {uploadFile.preview && (
        <Box>
          <Image
            src={uploadFile.preview}
            alt="image preview"
            width={100}
            height={100}
          />
          <IconButton onClick={removeImage}>
            <SendIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
