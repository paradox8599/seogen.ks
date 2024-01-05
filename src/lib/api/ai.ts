import { AINames, AIPlatform, AIRequest, AIResponse } from "@/lib/types/ai";
import { OLLAMA_PLATFORM, OPENAI_PLATFORM } from "../variables";

export type AskFn = (request: AIRequest) => Promise<AIResponse>;

export function aiFactory({ name }: { name: AINames }): AskFn {
  switch (name) {
    case AINames.openai:
      return (request: AIRequest) => askOpenAI({ request, platform: OPENAI_PLATFORM });
    case AINames.ollama:
      return (request: AIRequest) => askOllama({ request, platform: OLLAMA_PLATFORM });
    default:
      throw new Error(`Unknown AI platform: ${name}`);
  }
}

async function askOpenAI({ request, platform }: { request: AIRequest, platform: AIPlatform }) {
  const openaiRequest = {
    model: request.model,
    stream: request.stream,
    response_format: { type: request.format ?? "text" },
    messages: request.messages,
  }
  const res = await fetch(platform.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${platform.token}`,
    },
    body: JSON.stringify(openaiRequest)
  });
  const data = (await res.json())
  return data;
}

async function askOllama({ request, platform }: { request: AIRequest, platform: AIPlatform }) {
  const ollamaRequest: {
    model: string, stream: boolean, format?: 'json'
  } = {
    model: request.model,
    stream: request.stream ?? false,
  }
  request.format === "json" && (ollamaRequest.format = request.format);
  const res = await fetch(platform.url, {

    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(ollamaRequest)
  });
  const data = (await res.json())
  console.log(data)
  return data;
}
