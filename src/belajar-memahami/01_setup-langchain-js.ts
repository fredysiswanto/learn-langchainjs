/*
Memahami Setup langchain-js!
Setup adalah langkah awal yang penting dalam menggunakan langchain-js. Pada tahap ini, kita akan melakukan beberapa konfigurasi dasar yang diperlukan untuk menjalankan aplikasi kita dengan lancar. Berikut adalah beberapa hal yang biasanya dilakukan dalam tahap setup:

1. Instalasi Dependencies: Pastikan semua library dan paket yang diperlukan sudah terinstal dengan benar. Ini termasuk langchain-js itu sendiri, serta library tambahan seperti dotenv untuk mengelola variabel lingkungan.

2. Konfigurasi Variabel Lingkungan: Gunakan file .env untuk menyimpan informasi sensitif seperti API keys, URL database, dan konfigurasi lainnya. Pastikan untuk memuat variabel lingkungan ini di dalam kode menggunakan dotenv.

3. Inisialisasi Klien: Buat instance klien untuk layanan yang akan digunakan, seperti ChatOllama untuk berinteraksi dengan model LLM, atau SupabaseVectorStore untuk mengelola penyimpanan vektor.


4. Testing: Setelah semua konfigurasi selesai, lakukan pengujian awal untuk memastikan bahwa semua komponen bekerja dengan baik. Misalnya, coba kirimkan prompt sederhana ke model LLM atau lakukan query ke database untuk memastikan koneksi berhasil.

Dengan melakukan setup yang tepat, Anda akan memiliki fondasi yang kuat untuk membangun aplikasi langchain-js yang efektif dan efisien.

docs:
- https://reference.langchain.com/javascript/langchain
- https://reference.langchain.com/javascript/langchain-ollama

dependency yang digunakan:
- @langchain/ollama
- @langchain/core
- dotenv
*/

import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";

dotenv.config();

const ollama = new ChatOllama({
  baseUrl: `${process.env.OLLAMA_BASE_URL}`,
  model: `${process.env.MODEL_NAME}`,
  temperature: 0.5,
});

const response = await ollama.invoke("What is the capital of Indonesia?");

console.log("Response:", response.content);
