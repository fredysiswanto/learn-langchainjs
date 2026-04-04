import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { splitFile } from "./belajar-memahami/04a_split-file.js";
import { OllamaEmbeddings } from "@langchain/ollama";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL atau SUPABASE_KEY belum di-set di environment (process.env).",
  );
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Contoh pemakaian dasar (bisa kamu ubah / hapus):
async function main() {
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
  console.log("Supabase client siap dipakai");
  // Misal test query (sesuaikan nama tabel kalau sudah ada):
  // const { data, error } = await supabase.from("documents").select("*").limit(1);
  // console.log({ data, error });
}

main().catch((err) => {
  console.error("Error saat menjalankan script:", err);
});
