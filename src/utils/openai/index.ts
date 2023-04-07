import { Configuration, OpenAIApi } from "openai";
import * as fs from "fs";
import * as path from "path";
const configuration = new Configuration({
  apiKey: process.env.openApiKey,
});
export const openAi = new OpenAIApi(configuration);
const folderPath = "./rawData/";
export async function getDocuments() {
  // get file paths of all csv
  const files = fs.readdirSync(folderPath); // Read the files synchronously
  return files.filter(isCsvFile).map(toFilePath); // Extract the CSV file paths
}

function isCsvFile(file: string) {
  return path.extname(file) === ".csv";
}

function toFilePath(file: string) {
  return path.join(folderPath, file);
}
