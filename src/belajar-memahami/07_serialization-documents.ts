/*
Serialization Documents
Serialization documents adalah dokumen yang menjelaskan bagaimana data atau objek diubah menjadi format yang dapat disimpan atau ditransmisikan, dan kemudian dikembalikan ke bentuk aslinya. Dalam konteks pemrograman, ini sering merujuk pada proses mengubah objek menjadi string (seperti JSON) untuk penyimpanan atau komunikasi, dan kemudian mengonversinya kembali ke objek saat diperlukan.
Serialization sangat penting dalam berbagai aplikasi, seperti penyimpanan data, komunikasi antar sistem, dan transfer data melalui jaringan. Dengan menggunakan serialization, kita dapat menyimpan atau mengirim data dalam format yang lebih efisien dan mudah dipahami oleh berbagai sistem.

Dalam konteks penggunaan dengan LangChain, serialization documents dapat digunakan untuk memastikan bahwa data yang dikirim ke model bahasa (LLM) atau diterima dari LLM dapat dengan mudah diubah menjadi format yang sesuai untuk penyimpanan atau komunikasi. Misalnya, jika kita ingin menyimpan hasil output dari LLM dalam database, kita dapat menggunakan serialization untuk mengonversi output tersebut menjadi format JSON sebelum menyimpannya.

contoh case penggunaan Serialization Documents:
- Menyimpan hasil output dari LLM dalam database dengan format JSON.
- Mengirim data antar sistem dengan format yang efisien dan mudah dipahami.
*/

import dotenv from "dotenv";
dotenv.config();

// Contoh penggunaan Serialization Documents
const data = {
  name: "Alice",
  age: 30,
};

// Mengonversi objek menjadi string JSON untuk penyimpanan atau komunikasi
const serializedData = JSON.stringify(data);
console.log("Serialized Data:", serializedData); // Output: Serialized Data: {"name":"Alice","age":30}

// Mengonversi string JSON kembali menjadi objek JavaScript
const deserializedData = JSON.parse(serializedData);
console.log("Deserialized Data:", deserializedData); // Output: Deserialized Data: { name: 'Alice', age: 30 }

// Contoh penggunaan Serialization Documents dalam konteks LangChain
import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL!,
  model: process.env.MODEL_NAME!,
  temperature: 0.5,
});

const response: any = await llm.invoke("What is the capital of Indonesia?");

// Mengonversi output dari LLM menjadi string JSON untuk penyimpanan atau komunikasi
const serializedResponse = JSON.stringify(response);
console.log("Serialized LLM Response:", serializedResponse);

// Mengonversi string JSON kembali menjadi objek JavaScript
const deserializedResponse = JSON.parse(serializedResponse);
console.log("Deserialized LLM Response:", deserializedResponse);
