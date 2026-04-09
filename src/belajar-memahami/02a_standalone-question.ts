/*
Memahami Standalone Question!
Standalone Question adalah sebuah konsep dalam pemrosesan bahasa alami di mana sebuah pertanyaan yang awalnya tergantung pada konteks tertentu diubah menjadi pertanyaan yang berdiri sendiri (standalone) tanpa kehilangan makna aslinya.
Alur umum untuk membuat standalone question:
- Input: Pertanyaan awal yang mungkin tergantung pada konteks tertentu.
- Proses: Menggunakan model bahasa (LLM) untuk mengubah pertanyaan tersebut menjadi bentuk yang berdiri sendiri, dengan memastikan bahwa makna dan informasi penting tetap terjaga.
- Output: Pertanyaan baru yang dapat dipahami tanpa perlu merujuk pada konteks awal, sehingga dapat digunakan dalam berbagai situasi atau aplikasi.

Dengan membuat pertanyaan menjadi standalone, kita dapat meningkatkan fleksibilitas dan kegunaan pertanyaan tersebut dalam berbagai konteks, seperti dalam chatbot, sistem tanya jawab, atau aplikasi lain yang memerlukan pemahaman bahasa alami.
Simple-nya, standalone question adalah pertanyaan yang bisa dipahami dan dijawab tanpa perlu informasi tambahan atau konteks tertentu.
*/

// Contoh implementasi sederhana untuk membuat standalone question menggunakan TypeScript dan sebuah model bahasa (LLM):
import dotenv from "dotenv";
dotenv.config();
import { ChatOllama } from "@langchain/ollama";

async function createStandaloneQuestion(
  question: string,
): Promise<{ content: string; usage_metadata: any }> {
  const ollama = new ChatOllama({
    baseUrl: process.env.OLLAMA_BASE_URL,
    model: process.env.MODEL_NAME,
    temperature: 0,
  });

  // Prompt untuk mengubah pertanyaan menjadi standalone
  const prompt = `Ubah pertanyaan berikut menjadi standalone question tanpa kehilangan makna aslinya: "${question}"`;

  // Menggunakan model bahasa untuk menghasilkan standalone question
  const response = await ollama.invoke(prompt);
  if (response) {
    const { content, usage_metadata } = response;
    const contentString = typeof content === 'string' ? content : content.map(c => typeof c === 'string' ? c : c.text).join('');
    const data = { content: contentString, usage_metadata };
    return data;
  } else {
    throw new Error("Gagal membuat standalone question");
  }
}

// Contoh penggunaan
(async () => {
  const originalQuestion = "Apa itu TypeScript?";
  const standaloneQuestion = await createStandaloneQuestion(originalQuestion);
  console.log("Standalone Question:", standaloneQuestion);
})();
