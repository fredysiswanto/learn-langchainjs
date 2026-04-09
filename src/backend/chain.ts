import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "./retriever.js";
import { combinenDocuments } from "./utils.js";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

dotenv.config();

const ollama = new ChatOllama({
  baseUrl: `${process.env.OLLAMA_BASE_URL}` || "http://192.168.1.100:11434",
  model: `${process.env.MODEL_NAME}` || "lfm2.5-thinking:1.2b",
  temperature: 0,
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

export const chain = RunnableSequence.from([
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
