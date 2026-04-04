import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@supabase/supabase-js";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

/*
! Memahami Retrieval
Secara umum, proses retrieval mengikuti alur ini:
- Input: User memberikan pertanyaan (kueri).
- Embedding: Kueri tersebut diubah menjadi vektor (angka).
- Search: Retriever mencari di dalam database (biasanya Vector Store) untuk menemukan dokumen yang vektornya paling mirip dengan kueri tersebut.
- Output: Retriever mengembalikan daftar objek Document yang berisi teks dan metadata. 
*/

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// document.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const queryInput = document.getElementById("query") as HTMLInputElement;
//   //   progressConversation("Processing your query...");
// });

const embeddings = new OllamaEmbeddings({
  baseUrl: process.env.OLLAMA_BASE_URL!,
  model: "nomic-embed-text-v2-moe:latest",
  dimensions: 768,
});

const client = createClient(supabaseUrl!, supabaseKey!);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents_v1",
  queryName: "match_documents",
});

const retriever = vectorStore.asRetriever();

const llm = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL!,
  model: process.env.MODEL_NAME!,
  temperature: 0.5,
});

const standaloneQuestionTemplate = `Given a question, convert it to a standalone question. question: {question}`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate,
);
const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(llm)
  .pipe(new StringOutputParser())
  .pipe(retriever);

const response = await standaloneQuestionChain.invoke({
  question: "Apa itu nasi goreng?",
});

console.log("Response:", response);
