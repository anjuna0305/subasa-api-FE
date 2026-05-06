export const API_BASE_URL = "http://localhost:8000";
export const WS_BASE_URL = "ws://localhost:8765";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  CHATBOT_CHAT: `${API_BASE_URL}/voc-si/api/chatbot/chat`,
  FRAMEWORK_UPLOAD: `${API_BASE_URL}/voc-si/api/framework/upload`,
  ASR_WS: WS_BASE_URL,
  CUSTOM_CHATBOT_BY_URL: (urlPath: string) =>
    `${API_BASE_URL}/custom-chatbots/by-url-path/${urlPath}`,
  CUSTOM_CHATBOT_API: (retrievalKey: string) =>
    `${API_BASE_URL}/custom-chatbots/api/${retrievalKey}`,
  CUSTOM_CHATBOT_IMAGE: (heroImage: string) =>
    `${API_BASE_URL}/custom-chatbot/images/${heroImage}`,
};

export function parseErrorMessage(
  errorData: unknown,
  fallbackMessage: string,
): string {
  if (
    errorData &&
    typeof errorData === "object" &&
    "detail" in errorData
  ) {
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
