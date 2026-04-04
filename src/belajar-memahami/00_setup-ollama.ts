/*
Memahami Setup Ollama Local!
Ollama adalah sebuah platform yang memungkinkan kita untuk menjalankan model bahasa besar (LLM) secara lokal di mesin kita sendiri. Dengan menggunakan Ollama, kita dapat menghindari ketergantungan pada layanan cloud dan memiliki kontrol penuh atas data dan model yang kita gunakan.

Untuk melakukan setup Ollama local, berikut adalah langkah-langkah umum yang perlu dilakukan:

1. Instalasi Ollama: Pertama, kita perlu menginstal Ollama di mesin kita. Ini biasanya melibatkan mengunduh dan menjalankan installer yang disediakan oleh Ollama.
2. Konfigurasi Model: Setelah Ollama terinstal, kita perlu mengkonfigurasi model LLM yang ingin kita gunakan. Ini bisa melibatkan memilih model yang sudah tersedia atau mengunggah model kustom yang telah kita latih.
3. Menjalankan Ollama: Setelah konfigurasi selesai, kita dapat menjalankan Ollama untuk memulai server lokal yang akan menangani permintaan dari aplikasi kita.
4. Integrasi dengan Aplikasi: Setelah Ollama berjalan, kita dapat mengintegrasikannya dengan aplikasi kita menggunakan API yang disediakan oleh Ollama. Ini biasanya melibatkan mengirim permintaan HTTP ke server Ollama dengan prompt yang ingin kita proses.
Dengan mengikuti langkah-langkah ini, kita dapat dengan mudah melakukan setup Ollama local dan mulai menggunakan model bahasa besar untuk berbagai aplikasi seperti chatbot, analisis teks, dan banyak lagi.        
*/

import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";

dotenv.config();

const ollama = new ChatOllama({
  baseUrl: `${process.env.OLLAMA_BASE_URL}`,
  model: `${process.env.MODEL_NAME}`,
  temperature: 0.5,
});
