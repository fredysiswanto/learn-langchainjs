import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

dotenv.config();

/*
! Memahami PromptTemplate
PromptTemplate adalah sebuah class yang digunakan untuk membuat template prompt yang dinamis. Dengan PromptTemplate, kita bisa mendefinisikan sebuah string template yang memiliki placeholder (variabel) yang nantinya bisa diisi dengan nilai tertentu saat kita ingin menggunakannya.

Contoh penggunaan PromptTemplate:
- Kita bisa membuat sebuah template seperti "Buatkan resep {foodName} untuk sarapan yang tinggi protein, rendah karbohidrat. Hindari penggunaan gula tambahan atau gorengan. Pastikan langkah-langkahnya jelas untuk pemula."
- Kemudian, kita bisa menggunakan PromptTemplate untuk mengisi placeholder {foodName} dengan nilai "nasi goreng" sehingga menjadi prompt lengkap yang siap dikirim ke model LLM.

Dengan menggunakan PromptTemplate, kita bisa dengan mudah membuat prompt yang fleksibel dan dapat digunakan kembali dengan berbagai input yang berbeda.
*/

const ollama = new ChatOllama({
  baseUrl: `${process.env.OLLAMA_BASE_URL}`,
  model: `${process.env.MODEL_NAME}`,
  temperature: 0.5,
});
const question =
  "buatkan menu makan siang santai di rumah berbeda dengan makan siang untuk rapat kantor atau pesta ulang tahun";
const standaloneQuestionTemplate =
  "Given a question, convert it to a standalone question. question: {question}";

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate,
);

const standaloneQuestionChain = standaloneQuestionPrompt.pipe(ollama);
// console.log(standaloneQuestionChain);
const response = await standaloneQuestionChain.invoke({
  question: question,
});

console.log("Response:", response.content);

// const jenisMakanan = "sarapan";
// const foodName = "nasi goreng";
// const diet = "tinggi protein, rendah karbohidrat";
// const bahanDihindari = "gula tambahan atau gorengan";

// // template prompt untuk resep makanan
// const templateMenu = `Gunakan Bahasa English.
// Buatkan resep {foodName} untuk ${jenisMakanan} yang ${diet}. Hindari penggunaan ${bahanDihindari}. Pastikan langkah-langkahnya jelas untuk pemula.`;
// // const templat2 = `Buatkan resep {foodName} untuk sarapan yang tinggi protein, rendah karbohidrat. Hindari penggunaan gula tambahan atau gorengan. Pastikan langkah-langkahnya jelas untuk pemula.`;

// // a string template yang bisa diisi dengan variabel
// const menuPrompt = PromptTemplate.fromTemplate(templateMenu);

// const menuChain = menuPrompt.pipe(ollama);

// const response = await menuChain.invoke({ foodName });
// console.log("Prompt yang dikirim ke Ollama:", menuChain);
// console.log("Response dari Ollama:", response.content);
