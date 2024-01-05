export enum AINames {
  openai = 'openai',
  ollama = 'ollama',
};

export type AIName = `${AINames}`;

export type AIPlatform = {
  name: AINames;
  url: URL;
  token: string;
}

export type AIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export type AIRequest = {
  model: string;
  messages: AIMessage[];
  stream?: boolean;
  format?: 'json' | 'text';
}

export type AIChoice = {
  index: number;
  message: AIMessage;
  finish_reason: string;
}

export type OpenAIUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type OpenAIResponse = {
  model: string;
  id: string;
  choices: AIChoice[];
  usage: OpenAIUsage;
  systen_fingerprint: string;
}

export type OllamaResponse = {
  model: string;
  message: AIMessage[];
  done: boolean;
  total_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export type AIResponse = OpenAIResponse | OllamaResponse;

export type AIChat = (request: AIRequest) => Promise<AIResponse>;

