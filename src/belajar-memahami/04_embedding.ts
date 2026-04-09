/*
Memahami Embedding!
Embedding adalah representasi numerik dari teks yang memungkinkan model bahasa untuk memahami dan memproses informasi secara lebih efektif. Dengan mengubah teks menjadi vektor angka, model dapat melakukan operasi matematika untuk mengukur kesamaan antara teks, mencari informasi yang relevan, dan melakukan berbagai tugas pemrosesan bahasa alami.
Alur umum embedding:
- Input: Teks yang ingin diubah menjadi embedding (misalnya, kalimat, paragraf, atau dokumen).
- Proses: Algoritma embedding (seperti Word2Vec, GloVe, atau model transformer) mengubah teks menjadi vektor angka berdasarkan konteks dan makna kata-kata dalam teks tersebut.
- Output: Vektor angka (embedding) yang merepresentasikan teks asli. Vektor ini dapat digunakan untuk berbagai aplikasi seperti pencarian semantik, klasifikasi teks, atau sebagai input untuk model bahasa lainnya. 

secara sederhana embedding adalah cara untuk mengubah teks menjadi angka agar komputer bisa "memahami" dan memproses informasi tersebut dengan lebih baik.

contoh penggunaan embedding dalam aplikasi nyata:
1. Pencarian Semantik: Embedding memungkinkan mesin pencari untuk menemukan dokumen yang relevan berdasarkan makna, bukan hanya kata kunci. Misalnya, jika seseorang mencari "cara membuat kue", mesin pencari dapat menemukan artikel tentang "resep kue" karena embedding menangkap makna yang serupa.

2. Klasifikasi Teks: Dalam aplikasi seperti analisis sentimen, embedding digunakan untuk mengubah teks ulasan menjadi vektor angka yang kemudian dapat digunakan untuk melatih model klasifikasi untuk menentukan apakah ulasan tersebut positif, negatif, atau netral.

3. Penerjemahan Bahasa: Model penerjemahan bahasa menggunakan embedding untuk memahami konteks dan makna kata-kata dalam kalimat sumber dan menghasilkan terjemahan yang akurat dalam bahasa target.

4. Chatbot dan Asisten Virtual: Embedding membantu chatbot memahami pertanyaan pengguna dan memberikan jawaban yang relevan dengan menangkap makna di balik kata-kata yang digunakan oleh pengguna.

Dengan memahami embedding, kita dapat lebih efektif dalam mengembangkan aplikasi yang memanfaatkan pemrosesan bahasa alami dan meningkatkan kemampuan model bahasa untuk memahami dan merespons informasi dengan lebih baik.

contoh penggunaan embedding dalam ollama:
1. Pencarian Dokumen: Ollama dapat menggunakan embedding untuk memungkinkan pengguna mencari dokumen berdasarkan makna, bukan hanya kata kunci. Misalnya, jika pengguna mencari "cara membuat kue", Ollama dapat menemukan dokumen yang relevan tentang "resep kue" karena embedding menangkap makna yang serupa.

2. Rekomendasi Konten: Ollama dapat menggunakan embedding untuk memberikan rekomendasi konten yang relevan kepada pengguna berdasarkan preferensi mereka. Misalnya, jika pengguna sering membaca artikel tentang teknologi, Ollama dapat merekomendasikan artikel terkait teknologi lainnya.

3. Analisis Sentimen: Ollama dapat menggunakan embedding untuk menganalisis sentimen dari ulasan atau komentar pengguna. Dengan mengubah teks menjadi vektor angka, Ollama dapat melatih model klasifikasi untuk menentukan apakah ulasan tersebut positif, negatif, atau netral.

4. Penerjemahan Bahasa: Ollama dapat menggunakan embedding untuk membantu dalam penerjemahan bahasa dengan memahami konteks dan makna kata-kata dalam kalimat sumber dan menghasilkan terjemahan yang akurat dalam bahasa target.

Dengan memanfaatkan embedding, Ollama dapat meningkatkan kemampuan pencarian, rekomendasi, analisis sentimen, dan penerjemahan bahasa untuk memberikan pengalaman pengguna yang lebih baik.

latihan embedding dengan Ollama:
1. Buatlah sebuah dokumen yang berisi beberapa paragraf tentang topik tertentu (misalnya, teknologi, kesehatan, atau olahraga).
2. Gunakan Ollama untuk mengubah dokumen tersebut menjadi embedding.
3. Lakukan pencarian semantik dengan menggunakan embedding untuk menemukan informasi yang relevan dalam dokumen tersebut.
4. Coba gunakan embedding untuk menganalisis sentimen dari ulasan atau komentar yang terkait dengan dokumen tersebut.
5. Eksperimen dengan penerjemahan bahasa menggunakan embedding untuk memahami konteks dan makna kata-kata dalam kalimat sumber dan menghasilkan terjemahan yang akurat dalam bahasa target.

Dengan latihan ini, Anda dapat lebih memahami bagaimana embedding bekerja dan bagaimana Ollama dapat memanfaatkan embedding untuk meningkatkan kemampuan pencarian, analisis sentimen, dan penerjemahan bahasa.

jelaskan OllamaEmbeddings class!
OllamaEmbeddings adalah sebuah kelas dalam library Ollama yang digunakan untuk menghasilkan embedding dari teks. Kelas ini memungkinkan pengguna untuk mengubah teks menjadi representasi numerik (vektor) yang dapat digunakan untuk berbagai aplikasi pemrosesan bahasa alami, seperti pencarian semantik, analisis sentimen, dan penerjemahan bahasa.
Kelas OllamaEmbeddings memiliki beberapa metode utama, termasuk:
- embedQuery: Metode ini digunakan untuk menghasilkan embedding dari sebuah query atau teks input. Hasilnya adalah vektor angka yang merepresentasikan makna dari teks tersebut.
- embedDocuments: Metode ini digunakan untuk menghasilkan embedding dari sebuah dokumen atau kumpulan dokumen. Hasilnya adalah vektor angka yang merepresentasikan makna dari dokumen tersebut.

*/

import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";

const ollama = new ChatOllama({
  model: "nomic-embed-text-v2-moe:latest",
  baseUrl: "http://192.168.100.98:11434",
  temperature: 0,
});

const embedding = new OllamaEmbeddings({
  //   model: "nomic-embed-text-v2-moe:latest",
  model: "qwen3-embedding:4b",
  baseUrl: "http://192.168.100.98:11434",
  dimensions: 1024,
});

const response = await embedding.embedQuery(
  "Indonesia adalah negara kepulauan yang kaya akan budaya dan keindahan alam.",
);

console.log("Embedding:", response);
