import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import fs from "node:fs/promises";
import path from "node:path";

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
*/

export async function splitFile(
  relativePath = path.join("data", "nasi-goreng.md"),
): Promise<Document[]> {
  const filePath = path.join(process.cwd(), relativePath);
  const text = await fs.readFile(filePath, "utf8");

  // console.log("Loaded file:", filePath);
  // console.log("Original text length:", text.length);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
    separators: ["\n\n", "\n", " ", ""],
  });

  const output = await splitter.createDocuments([text]);

  // console.log("result Splitter:", output);
  // console.log("Total chunks created:", output.length);

  return output;
}

// Contoh pemanggilan langsung (boleh dihapus kalau dipakai sebagai module):
// async function main() {
//   await splitFile();
// }

// main().catch((err) => {
//   console.error("Error saat split file:", err);
// });
