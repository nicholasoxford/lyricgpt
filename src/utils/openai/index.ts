import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.openApiKey,
});
export const openAi = new OpenAIApi(configuration);
