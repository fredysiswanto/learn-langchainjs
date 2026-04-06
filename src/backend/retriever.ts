import dotenv from "dotenv";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OllamaEmbeddings } from "@langchain/ollama";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const embeddings = new OllamaEmbeddings({
  baseUrl: process.env.OLLAMA_BASE_URL!,
  model: "nomic-embed-text-v2-moe:latest",
  dimensions: 768,
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL atau SUPABASE_KEY belum di-set di environment (process.env).",
  );
}
const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabaseClient,
  tableName: "documents_v1",
  queryName: "match_documents",
});

const retriever = vectorStore.asRetriever();

export { retriever };
