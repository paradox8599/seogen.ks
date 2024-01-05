import { AINames, AIPlatform } from "./types/ai";

// KeystoneJS server config
type DB_PROVIDER_TYPE = "sqlite" | "mysql" | "postgresql";

export const KS_PORT = parseInt(process.env.KS_PORT || "3000");

export const DB_PROVIDER: DB_PROVIDER_TYPE =
  (process.env.DB_PROVIDER as DB_PROVIDER_TYPE) || "sqlite";

export const DATABASE_URL = process.env.DATABASE_URL || "file://keystone.db";

// KeystoneJS & GraphQL Server
export const SERVER_URL = new URL(
  process.env.NEXT_PUBLIC_SERVER_URL ?? "http://locahost:3000"
);

export const GRAPHQL_PATH =
  process.env.NEXT_PUBLIC_GRAPHQL_PATH ?? "/api/graphql";

export const GRAPHQL_ENDPOINT = new URL(GRAPHQL_PATH, SERVER_URL);

export const OLLAMA_URL_CHAT = new URL(process.env.OLLAMA_URL_CHAT ?? "http://localhost:11434/api/chat")
export const OPENAI_URL_CHAT = new URL(process.env.OPENAI_URL_CHAT ?? "https://api.openai.com/v1/chat/completions")
export const OPENAI_API_TOKEN = process.env.OPENAI_API_TOKEN;
export const OPENAI_PLATFORM: AIPlatform = {
  name: AINames.openai,
  url: OPENAI_URL_CHAT,
  token: OPENAI_API_TOKEN ?? "",
};

export const OLLAMA_PLATFORM: AIPlatform = {
  name: AINames.ollama,
  url: OLLAMA_URL_CHAT,
  token: "",
}

