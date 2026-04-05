/*
Memahami Setup Ollama!
Ollama adalah sebuah platform yang memungkinkan kita untuk menjalankan model bahasa besar (LLM) secara lokal di mesin kita sendiri. Dengan menggunakan Ollama, kita dapat menghindari ketergantungan pada layanan cloud dan memiliki kontrol penuh atas data dan model yang kita gunakan.

Untuk melakukan setup Ollama local, berikut adalah langkah-langkah umum yang perlu dilakukan:

1. Instalasi Ollama: Pertama, kita perlu menginstal Ollama di perangkat kita. Ini biasanya melibatkan mengunduh dan menjalankan installer yang disediakan oleh Ollama.

2. Konfigurasi Model: Setelah Ollama terinstal, kita perlu mengkonfigurasi model LLM yang ingin kita gunakan. Ini bisa melibatkan memilih model yang sudah tersedia, gunakan yang ukuran kecil untuk 
penggunaan di local.

3. Menjalankan Ollama: Setelah konfigurasi selesai, kita dapat menjalankan Ollama untuk memulai server lokal yang akan menangani permintaan dari aplikasi kita.

4. Integrasi dengan Aplikasi: Setelah Ollama berjalan, kita dapat mengintegrasikannya dengan aplikasi kita menggunakan API yang disediakan oleh Ollama. Ini biasanya melibatkan mengirim permintaan HTTP ke server Ollama dengan prompt yang ingin kita proses.

Dengan mengikuti langkah-langkah ini, kita dapat dengan mudah melakukan setup Ollama local dan mulai menggunakan model bahasa besar untuk berbagai aplikasi seperti chatbot, analisis teks, dan banyak lagi.        

docs: 
- https://github.com/ollama/ollama-js
- https://docs.ollama.com/api/introduction
*/

import dotenv from "dotenv";
import { Ollama } from "ollama";

dotenv.config();

const llm = new Ollama({
  host: `${process.env.OLLAMA_BASE_URL}`, // defautlly http://localhost:11434
});
// const massage = "sample prompt untuk testing setup ollama local";

// const response = await llm.chat({
//   model: `${process.env.MODEL_NAME}`, // sesuaikan dengan model yang ada di ollama local kamu, gunakan yang ukuran kecil agar tidak proses lebih cepat
//   messages: [{ role: "user", content: massage }],
// });
// console.log("Response:", response);

// Latihan mengirim prompt sederhana ke Ollama
// const response = await llm.chat({
//   model: `${process.env.MODEL_NAME}`,
//   messages: [{ role: "user", content: "What is the capital of Indonesia?" }],
// });
// console.log("Melihat Response Ollama:", response);

/* Challenge:
1. Coba ganti prompt di atas dengan pertanyaan lain yang kamu suka, misalnya "What is the tallest mountain in the world?" atau "Who is the president of Indonesia?".

2. Coba tambahkan beberapa opsi konfigurasi lain saat membuat instance ChatOllama, seperti maxTokens atau topP, dan lihat bagaimana itu mempengaruhi respons yang kamu dapatkan.

3. Coba Bandingkan response dengan temperature yang berbeda, misalnya 0.0, 0.5, dan 1.0, dan lihat bagaimana itu mempengaruhi kreativitas jawaban yang diberikan oleh model.
*/

try {
  // Latihan mengirim prompt sederhana ke Ollama
  const response = await llm.chat({
    model: `${process.env.MODEL_NAME}`,
    messages: [{ role: "user", content: "What is the capital of Indonesia?" }],
  });
  console.log("Response:", response.message.content);
} catch (error) {
  console.error("Error:", error);
}
