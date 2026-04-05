import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { splitFile } from "./04a_split-file.js";
import { OllamaEmbeddings } from "@langchain/ollama";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL atau SUPABASE_KEY belum di-set di environment (process.env).",
  );
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);
// Test koneksi ke Supabase (misal dengan query sederhana):
// const { data, error } = await supabaseClient
//   .from("documents_v1")
//   .select("*")
//   .limit(1);
// console.log({ data, error });

// Contoh basic penggunaan SupabaseVectorStore dengan OllamaEmbeddings:
async function main() {
  // test insert data ke supabase
  const documentsOutput = await splitFile();
  await SupabaseVectorStore.fromDocuments(
    documentsOutput,
    new OllamaEmbeddings({
      baseUrl: process.env.OLLAMA_BASE_URL!,
      model: "nomic-embed-text-v2-moe:latest",
      dimensions: 768,
    }),
    { client: supabaseClient, tableName: "documents_v1" },
  );
  console.log("Supabase Ready!");
  // Misal test query (sesuaikan nama tabel kalau sudah ada):
  // const { data, error } = await supabase.from("documents").select("*").limit(1);
  // console.log({ data, error });
}

// main().catch((errors) => {
//   console.error("Error saat menjalankan script:", errors);
// });
