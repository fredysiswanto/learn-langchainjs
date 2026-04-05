import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "./retriver.js";
import { combinenDocuments } from "./combine-docs.js";
import { type context } from "langchain";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

dotenv.config();

document.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submit event triggered");
  progressConversation();
});

const ollama = new ChatOllama({
  baseUrl: `${process.env.OLLAMA_BASE_URL}`,
  model: `${process.env.MODEL_NAME}`,
  temperature: 0.5,
});

const standaloneQuestionTemplate =
  "Given a question, convert it into a standalone question. question: {question}.";

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate,
);

const answerTemplate = `You are a helpful assistant and enthusiastic support bot for who can answer questions about Indonesia Food based on the context provided. If you don't know the answer, say you don't know. Dont try to make up an answer. Always speak as if you were chatting to a friend. 
context:{context}
question: {question}
answer:`;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(ollama)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResuts) => prevResuts.standaloneQuestion,
  retriever,
  combinenDocuments,
]);

const answerChain = answerPrompt.pipe(ollama).pipe(new StringOutputParser());

const chain = RunnableSequence.from([
  {
    standaloneQuestion: standaloneQuestionChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,
    question: ({ original_input }) => original_input.question,
  },
  answerChain,
]);

// const response = await chain.invoke({
//   question: "apakah pisang bisa ditambahkan ke nasi goreng?",
// });

async function progressConversation() {
  console.log("panggil progress conversation");
  const userInput = document.getElementById("user-input") as HTMLInputElement;
  const chatbotConversation = document.getElementById(
    "chatbot-conversation-container",
  ) as HTMLDivElement;
  const question = userInput.value;
  userInput.value = "";

  // add human message
  const newHumanSpeechBubble = document.createElement("div");
  newHumanSpeechBubble.classList.add("speech", "speech-human");
  chatbotConversation.appendChild(newHumanSpeechBubble);
  newHumanSpeechBubble.textContent = question;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;

  const response = await chain.invoke({ question });

  // add bot massage
  const newAiSpeechBubble = document.createElement("div");
  newAiSpeechBubble.classList.add("speech", "speech-ai");
  chatbotConversation.appendChild(newAiSpeechBubble);
  newAiSpeechBubble.textContent = "response: " + response;
  chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
}
