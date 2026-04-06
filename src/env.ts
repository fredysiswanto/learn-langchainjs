import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} is not defined`);
  }
  return value || "";
};
