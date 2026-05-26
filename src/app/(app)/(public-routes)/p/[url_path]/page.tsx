import { API_ENDPOINTS } from "@/utils/api";
import { CustomChatbot } from "@/types/custom-chatbot";
import CustomChatShell from "@/components/CustomChatShell";
import { notFound } from "next/navigation";

async function getChatbotData(urlPath: string): Promise<CustomChatbot | null> {
  try {
    const res = await fetch(API_ENDPOINTS.CUSTOM_CHATBOT_BY_URL(urlPath), {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function CustomChatbotPage({
  params,
}: {
  params: Promise<{ url_path: string }>;
}) {
  const { url_path } = await params;
  const chatbotData = await getChatbotData(url_path);

  if (!chatbotData) {
    notFound();
  }

  const heroImageUrl = API_ENDPOINTS.CUSTOM_CHATBOT_IMAGE(
    chatbotData.hero_image,
  );

  return (
    <CustomChatShell chatbotData={chatbotData} heroImageUrl={heroImageUrl} />
  );
}
