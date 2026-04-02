import { ChatOllama } from "@langchain/ollama";
const llm = new ChatOllama({
  baseUrl: "http://192.168.100.98:11434",
  model: "lfm2.5-thinking:1.2b",
  temperature: 0,
  maxRetries: 2,
});

const prompt = "What is the capital of Indonesia?";

async function runChat() {
  try {
    const res = await llm.invoke(prompt);
    console.log("Response:", res);
  } catch (error) {
    console.error(
      "Connection failed. Check if OLLAMA_HOST=0.0.0.0 is set on the server.",
    );
  }
}

runChat();
