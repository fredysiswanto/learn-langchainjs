// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { Document } from "@langchain/core/documents";
// import fs from "node:fs/promises";
// import path from "node:path";

/*
! Memahami Text Splitting
Text splitting adalah proses membagi teks panjang menjadi bagian-bagian yang lebih kecil (chunks) agar lebih mudah diproses oleh model bahasa. 
Alur umum text splitting:
- Input: Teks panjang yang ingin dibagi.
- Proses: Algoritma pembagi teks menggunakan aturan tertentu (misalnya berdasarkan paragraf, kalimat, atau karakter) untuk memecah teks menjadi potongan-potongan yang lebih kecil.
- Output: Daftar objek Document yang berisi potongan teks dan metadata terkait (misalnya nomor urut chunk, sumber dokumen, dll).

konsep chunkSize dan chunkOverlap:
- chunkSize: Ukuran maksimum dari setiap potongan teks (dalam karakter). Misalnya, jika chunkSize adalah 500, maka setiap chunk tidak akan melebihi 500 karakter.
- chunkOverlap: Jumlah karakter yang tumpang tindih antara dua chunk berturut-turut. Misalnya, jika chunkOverlap adalah 50, maka 50 karakter terakhir dari chunk sebelumnya akan dimasukkan di awal chunk berikutnya. Ini membantu menjaga konteks saat memproses teks yang dibagi.

Jelaskan class dan property pada text splitter:
- CharacterTextSplitter: Kelas ini digunakan untuk membagi teks berdasarkan karakter. Properti utama termasuk:
  - chunkSize: Menentukan ukuran maksimum dari setiap chunk dalam karakter.
  - chunkOverlap: Menentukan jumlah karakter yang tumpang tindih antara dua chunk berturut-turut.
  - separators: Daftar string yang digunakan sebagai pemisah untuk membagi teks. Misalnya, ["\n\n", "\n", " ", ""] akan mencoba membagi berdasarkan paragraf terlebih dahulu, kemudian kalimat, lalu kata, dan akhirnya karakter jika tidak ada pemisah lain yang ditemukan.
- RecursiveCharacterTextSplitter: Kelas ini adalah turunan dari CharacterTextSplitter yang menggunakan pendekatan rekursif untuk membagi teks. Ini mencoba membagi teks berdasarkan pemisah yang ditentukan, dan jika chunk yang dihasilkan masih terlalu besar, ia akan mencoba membagi lagi menggunakan pemisah berikutnya dalam daftar.
- TextSplitter: Kelas dasar untuk semua jenis text splitter. Ini menyediakan antarmuka umum untuk membagi teks, tetapi tidak mengimplementasikan logika pembagian itu sendiri. Kelas ini biasanya digunakan sebagai kelas dasar untuk berbagai jenis text splitter yang lebih spesifik (seperti CharacterTextSplitter, RecursiveCharacterTextSplitter, dll.).

tips dalam menggunakan text splinter langchain dengan efektif:
1. Pilih jenis text splitter yang sesuai dengan kebutuhan Anda. Misalnya, jika Anda ingin mempertahankan konteks antar kalimat, gunakan RecursiveCharacterTextSplitter dengan pemisah yang tepat.

2. Sesuaikan chunkSize dan chunkOverlap berdasarkan panjang teks dan kebutuhan konteks. Jika teks sangat panjang, Anda mungkin perlu meningkatkan chunkSize, tetapi pastikan untuk menjaga chunkOverlap agar tidak kehilangan konteks penting.

3. Gunakan metadata untuk melacak asal-usul setiap chunk. Ini akan membantu Anda mengelola dan mengidentifikasi potongan teks saat memproses hasilnya.

4. Eksperimen dengan berbagai pemisah untuk menemukan yang paling efektif dalam membagi teks Anda. Misalnya, jika teks Anda memiliki banyak paragraf, menggunakan "\n\n" sebagai pemisah utama mungkin lebih efektif daripada menggunakan spasi.

5. Pertimbangkan untuk menggunakan pendekatan rekursif jika teks Anda sangat panjang atau kompleks, sehingga Anda dapat memastikan bahwa setiap chunk tetap dalam batasan yang dapat diproses oleh model bahasa tanpa kehilangan konteks yang penting.

tantangan dalam text splitting:
1. Menentukan aturan pembagian yang tepat: Memilih apakah akan membagi berdasarkan paragraf, kalimat, atau karakter dapat mempengaruhi kualitas hasil dan konteks yang dipertahankan dalam setiap chunk.

2. Menjaga konteks: Jika chunkSize terlalu kecil, informasi penting mungkin terpotong, sementara jika terlalu besar, model bahasa mungkin kesulitan memprosesnya. Menentukan chunkOverlap yang tepat juga penting untuk menjaga konteks antar chunk.

3. Mengelola metadata: Saat membagi teks menjadi chunks, penting untuk menyimpan metadata yang relevan (seperti nomor urut chunk, sumber dokumen, dll.) agar dapat melacak asal-usul setiap potongan teks.

4. Efisiensi pemrosesan: Membagi teks menjadi terlalu banyak chunks dapat meningkatkan waktu pemrosesan dan penggunaan sumber daya, sementara terlalu sedikit chunks mungkin tidak memberikan manfaat yang cukup dalam hal pemahaman konteks.

Dengan memahami konsep text splitting dan tantangan yang terkait,kita dapat lebih efektif dalam mempersiapkan teks untuk diproses oleh model bahasa dan meningkatkan kualitas hasil yang diperoleh dari model tersebut.


text splitting:
1. Menentukan aturan pembagian yang tepat: Memilih apakah akan membagi berdasarkan paragraf, kalimat, atau karakter dapat mempengaruhi kualitas hasil dan konteks yang dipertahankan dalam setiap chunk.

2. Menjaga konteks: Jika chunkSize terlalu kecil, informasi penting mungkin terpotong, sementara jika terlalu besar, model bahasa mungkin kesulitan memprosesnya. Menentukan chunkOverlap yang tepat juga penting untuk menjaga konteks antar chunk.

3. Mengelola metadata: Saat membagi teks menjadi chunks, penting untuk menyimpan metadata yang relevan (seperti nomor urut chunk, sumber dokumen, dll.) agar dapat melacak asal-usul setiap potongan teks.

4. Efisiensi pemrosesan: Membagi teks menjadi terlalu banyak chunks dapat meningkatkan waktu pemrosesan dan penggunaan sumber daya, sementara terlalu sedikit chunks mungkin tidak memberikan manfaat yang cukup dalam hal pemahaman konteks.

Dengan memahami konsep text splitting dan tantangan yang terkait,kita dapat lebih efektif dalam mempersiapkan teks untuk diproses oleh model bahasa dan meningkatkan kualitas hasil yang diperoleh dari model tersebut.
*/

// export async function splitFile(
//   relativePath = path.join("data", "nasi-goreng.md"),
// ): Promise<Document[]> {
//   const filePath = path.join(process.cwd(), relativePath);
//   const text = await fs.readFile(filePath, "utf8");

//   // console.log("Loaded file:", filePath);
//   // console.log("Original text length:", text.length);

//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 50,
//     separators: ["\n\n", "\n", " ", ""],
//   });

//   const output = await splitter.createDocuments([text]);

//   // console.log("result Splitter:", output);
//   // console.log("Total chunks created:", output.length);

//   return output;
// }

// Contoh pemanggilan langsung (boleh dihapus kalau dipakai sebagai module):
// async function main() {
//   await splitFile();
// }

// main().catch((err) => {
//   console.error("Error saat split file:", err);
// });

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const text = `Indonesia adalah negara kepulauan yang kaya akan budaya dan keindahan alam. Dengan lebih dari 17.000 pulau, Indonesia memiliki beragam suku, bahasa, dan tradisi yang unik. Keindahan alamnya meliputi pantai-pantai eksotis, gunung-gunung yang menakjubkan, dan hutan tropis yang lebat. Budaya Indonesia tercermin dalam seni, musik, tarian, dan kuliner yang beragam di setiap daerah. Keanekaragaman ini menjadikan Indonesia sebagai salah satu destinasi wisata yang menarik di dunia.`;

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 20,
  chunkOverlap: 0,
  separators: ["\n\n", "\n", " ", ""],
});

const output = await splitter.createDocuments([text]);
console.log("result Splitter:", output[2].pageContent);
console.log("Total chunks created:", output.length);
