import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { openAi, supabaseClient } from "@/utils";

export async function GET() {
  // empty array to hold all song rows
  let allSongRows: songRow[] = [];
  // grab all lyric csv filepaths
  const lyricPath = await getDocuments();

  for (let i = 0; i < lyricPath.length; i++) {
    // grab file path and contents
    const path = lyricPath[i];
    const fileContent = fs.readFileSync(path, { encoding: "utf-8" });

    // parse csv with csv-parse
    // make sure to pass in exactly the same headers as the csv file
    // good to normalize headers across datasets
    const parseCsv = parse(fileContent, {
      delimiter: ",",
      columns: headers,
    });

    // had to hand write a promise to parse csv
    await new Promise((resolve, reject) => {
      parseCsv.on("readable", () => {
        let record;
        while ((record = parseCsv.read())) {
          allSongRows.push(record);
        }
      });
      parseCsv.on("error", (err) => reject(err));
      parseCsv.on("end", () => resolve("done"));
    });

    // loop through all rows
    for (let i = 0; i < allSongRows.length; i++) {
      const row = allSongRows[i];

      // grab relevant data from row
      const songStringObj = ` ${row.artist} ${row.title} ${row.lyrics}`;

      // OpenAI recommends replacing newlines with spaces for best results
      const songString = songStringObj.replace(/\n/g, " ").trim().toLowerCase();

      // call openai to generate embedding vectors
      const embeddingResponse = await openAi
        .createEmbedding({
          model: "text-embedding-ada-002",
          input: songString,
        })
        .catch((err) => {
          console.log("error", err);
        });

      // if no embedding response, skip to next row
      if (!embeddingResponse) {
        continue;
      }

      // grab embedding vector from response
      const [{ embedding }] = embeddingResponse.data.data;

      // Insert the document into the database, including embeddings
      await supabaseClient.from("documents").insert({
        title: row.title,
        artist: row.artist,
        lyrics: row.lyrics,
        pageCounts: row.pageviews,
        content: songString,
        embedding,
      });
    }
  }
  return new Response("ok");
}

const folderPath = "./rawData/";
// headers for csv-parse
const headers = [
  "artist",
  "id",
  "lyrics_owner_id",
  "primary_artist_id",
  "primary_artist_name",
  "song_art_image_thumbnail_url",
  "title",
  "url",
  "pageviews",
  "lyrics",
];

type songRow = {
  artist: string;
  id: string;
  lyrics_owner_id: string;
  primary_artist_id: string;
  primary_artist_name: string;
  song_art_image_thumbnail_url: string;
  title: string;
  url: string;
  pageviews: string;
  lyrics: string;
};

async function getDocuments() {
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
