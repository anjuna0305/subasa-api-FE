export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_BASE_URL ?? "ws://localhost:8765";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  CHATBOT_CHAT: `${API_BASE_URL}/voc-si/api/chatbot/chat`,
  FRAMEWORK_UPLOAD: `${API_BASE_URL}/voc-si/api/framework/upload`,
  ASR_WS: WS_BASE_URL,
  CUSTOM_CHATBOT_LIST: `${API_BASE_URL}/custom-chatbots`,
  CUSTOM_CHATBOT_DETAIL: (id: number) =>
    `${API_BASE_URL}/custom-chatbots/${id}`,
  CUSTOM_CHATBOT_UPLOAD_IMAGE: (id: number) =>
    `${API_BASE_URL}/custom-chatbots/${id}/upload-image`,
  CUSTOM_CHATBOT_UPLOAD_FILE: (id: number) =>
    `${API_BASE_URL}/custom-chatbots/${id}/upload-file`,
  CUSTOM_CHATBOT_PUBLISH: (id: number) =>
    `${API_BASE_URL}/custom-chatbots/publish/${id}`,
  CUSTOM_CHATBOT_UNPUBLISH: (id: number) =>
    `${API_BASE_URL}/custom-chatbots/unpublish/${id}`,
  CUSTOM_CHATBOT_BY_URL: (urlPath: string) =>
    `${API_BASE_URL}/custom-chatbots/by-url-path/${urlPath}`,
  CUSTOM_CHATBOT_API: (urlPath: string) =>
    `${API_BASE_URL}/custom-chatbots/api/${urlPath}`,
  CUSTOM_CHATBOT_IMAGE: (imageName: string) =>
    `${API_BASE_URL}/custom-chatbots/images/${imageName}`,
  ASR_TRANSCRIBE: `${API_BASE_URL}/voc-si/api/asr/transcribe`,
  TTS_GENERATE: `${API_BASE_URL}/voc-si/api/tts/voicebot-generate-audio`,
};

export function parseErrorMessage(
  errorData: unknown,
  fallbackMessage: string,
): string {
  if (errorData && typeof errorData === "object" && "detail" in errorData) {
    const detail = (errorData as Record<string, unknown>).detail;
    if (Array.isArray(detail)) {
      return (detail as Array<{ message: string }>)
        .map((e) => e.message)
        .join(", ");
    }
    if (typeof detail === "string") {
      return detail;
    }
  }
  return fallbackMessage;
}
