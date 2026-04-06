/*
 Memahami String Output Parser
StringOutputParser adalah sebuah kelas yang digunakan untuk memproses output dari model bahasa (LLM) yang berupa string. Kelas ini berguna ketika kita ingin memastikan bahwa output yang dihasilkan oleh LLM sesuai dengan format yang kita harapkan, terutama ketika kita ingin mengonversi string tersebut menjadi tipe data tertentu seperti JSON, angka, atau format lainnya.

Dalam konteks penggunaan dengan LangChain, StringOutputParser dapat digunakan untuk mengambil output dari LLM dan memprosesnya agar sesuai dengan kebutuhan aplikasi kita. Misalnya, jika kita mengharapkan output dalam format JSON, kita dapat menggunakan StringOutputParser untuk mencoba mengonversi string tersebut menjadi objek JavaScript.

contoh case penggunaan StringOutputParser:
- Mengonversi output string dari LLM menjadi objek JavaScript.
- Memastikan bahwa output yang dihasilkan oleh LLM sesuai dengan format yang diharapkan sebelum digunakan dalam aplikasi kita.
*/
import dotenv from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
dotenv.config();

// Contoh penggunaan StringOutputParser
const parser = new StringOutputParser();

// Misalnya kita memiliki output dari LLM yang berupa string JSON
const llmOutput = '{"name": "Alice", "age": 30}';

// try {
//   // Menggunakan StringOutputParser untuk mengonversi string menjadi objek JavaScript
//   const parsedOutput = parser.parse(llmOutput);
//   console.log(parsedOutput); // Output: { name: 'Alice', age: 30 }
// } catch (error) {
//   console.error("Error parsing output:", error);
// }

// Contoh lain, jika output dari LLM tidak valid JSON
const invalidOutput = "This is not a JSON string";

// try {
//   const parsedInvalidOutput = parser.parse(invalidOutput);
//   console.log(parsedInvalidOutput);
// } catch (error) {
//   console.error("Error parsing invalid output:", error); // Output: Error parsing invalid output: SyntaxError: Unexpected token T in JSON at position 0
// }

// contoh penggunaan StringOutputParser dalam konteks LangChain
import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
  baseUrl: process.env.OLLAMA_BASE_URL!,
  model: process.env.MODEL_NAME!,
  temperature: 0.5,
});

const response: any = await llm.invoke("What is the capital of Indonesia?");
try {
  console.log("Raw LLM response:", response.content); // Output: "Jakarta"
  const parsedResponse = parser.parse(response);
  console.log("Parsed LLM response:", parsedResponse); // Output: "Jakarta"
} catch (error) {
  console.error("Error parsing LLM response:", error);
}
