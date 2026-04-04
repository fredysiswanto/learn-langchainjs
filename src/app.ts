import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getTemperature(): number {
  const raw = process.env.TEMPERATURE;
  if (!raw || raw.trim() === "") {
    return 0.5;
  }

  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    console.warn(
      `Invalid TEMPERATURE value (\"${raw}\"). Falling back to default 0.5.`,
    );
    return 0.5;
  }
  return parsed;
}

let llm: ChatOllama;

try {
  const baseUrl = requireEnv("OLLAMA_BASE_URL");
  const model = requireEnv("MODEL_NAME");

  llm = new ChatOllama({
    baseUrl,
    model,
    temperature: getTemperature(),
    maxRetries: 2,
  });
} catch (error) {
  console.error("Failed to initialize ChatOllama client.");
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  process.exit(1);
}

const prompt = "What is the capital of Indonesia?";

async function runChat() {
  try {
    const res = await llm.invoke(prompt);
    console.log("Response:", res);
  } catch (error) {
    console.error("Error while calling Ollama:");
    if (error instanceof Error) {
      console.error("Name:", error.name);
      console.error("Message:", error.message);
      // if (error.stack) {
      //   console.error("Stack:", error.stack);
      // }
    } else {
      console.error(error);
    }

    console.error(
      "Troubleshooting tips: \n" +
        "- Pastikan server Ollama berjalan.\n" +
        "- Cek OLLAMA_BASE_URL di .env (contoh: http://localhost:11434).\n" +
        "- Jika remote server, pastikan OLLAMA_HOST=0.0.0.0 di sisi server.",
    );
  }
}

runChat();
