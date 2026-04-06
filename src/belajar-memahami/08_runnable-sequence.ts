/*
 Runnable Sequence langchainjs adalah sebuah konsep yang memungkinkan kita untuk menjalankan serangkaian langkah atau tugas secara berurutan. Dalam konteks pemrograman, ini sering digunakan untuk mengatur alur kerja atau proses yang kompleks, di mana setiap langkah harus diselesaikan sebelum melanjutkan ke langkah berikutnya. Runnable Sequence dapat membantu kita mengelola dependensi antar langkah, menangani error dengan lebih baik, dan memastikan bahwa proses berjalan dengan lancar.

Dalam konteks penggunaan dengan LangChain, Runnable Sequence dapat digunakan untuk mengatur alur kerja yang melibatkan interaksi dengan model bahasa (LLM) atau tugas-tugas lain yang terkait. Misalnya, kita dapat menggunakan Runnable Sequence untuk mengatur proses pengambilan data, pemrosesan data, dan kemudian mengirimkan hasilnya ke LLM untuk mendapatkan output yang diinginkan.

contoh case penggunaan Runnable Sequence:
- Mengatur alur kerja yang melibatkan beberapa langkah yang harus dijalankan secara berurutan.
- Menangani dependensi antar langkah dalam proses yang kompleks.
- Memastikan bahwa setiap langkah selesai dengan sukses sebelum melanjutkan ke langkah berikutnya.


 */

import dotenv from "dotenv";
dotenv.config();

// Contoh penggunaan Runnable Sequence
async function step1(): Promise<string> {
  console.log("Step 1: Mengambil data...");
  // Simulasi pengambilan data
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data dari step 1"), 1000),
  );
}

async function step2(dataFromStep1: string): Promise<string> {
  console.log("Step 2: Memproses data...");
  // Simulasi pemrosesan data
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Hasil pemrosesan ${dataFromStep1}`), 1000),
  );
}

async function step3(dataFromStep2: string): Promise<string> {
  console.log("Step 3: Mengirim data ke LLM...");
  // Simulasi pengiriman data ke LLM
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(`Output dari LLM berdasarkan ${dataFromStep2}`),
      1000,
    ),
  );
}

async function runSequence() {
  try {
    const data1 = await step1();
    const data2 = await step2(data1);
    const finalOutput = await step3(data2);
    console.log("Final Output:", finalOutput);
  } catch (error) {
    console.error("Error dalam menjalankan sequence:", error);
  }
}

// runSequence();

// contoh penggunaan Runnable Sequence dalam konteks LangChain
import { ChatOllama } from "@langchain/ollama";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// 1. Define your components
const prompt = ChatPromptTemplate.fromTemplate(
  "Tell me a short joke about {topic}",
);
const llm = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL!,
  model: process.env.MODEL_NAME!,
  temperature: 0.5,
});
const outputParser = new StringOutputParser();

// 2. Create the sequence (using the .pipe() method)
// const chain = prompt.pipe(llm).pipe(outputParser);

// 3. Alternatively, use the explicit constructor

const chain = RunnableSequence.from([prompt, llm, outputParser]);

// 4. Run the chain
const result = await chain.invoke({ topic: "bears" });

console.log(result);
// Output: "Why don't bears wear shoes? Because they have bear feet!"
