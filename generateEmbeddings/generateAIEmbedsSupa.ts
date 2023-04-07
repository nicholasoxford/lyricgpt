import { parse } from "csv-parse";
import * as fs from "fs";
import { getDocuments, openAi, songRow, supabaseClient } from "@/utils";

export async function GET(req: Request, res: Response) {
  // empty array to hold all song rows
  // grab all lyric csv filepaths
  const lyricPath = await getDocuments();

  for (let i = 0; i < lyricPath.length; i++) {
    let allSongRows: songRow[] = [];
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

    // loop through all rows 10 at a time
    for (let i = 0; i < allSongRows.length; i += 10) {
      // grab 10 rows at a time
      const rows = allSongRows.slice(i, i + 10);
      const allInsertsPromises = rows.map(async (row) => {
        // grab relevant data from row
        const songStringObj = ` ${row.artist} ${row.title} ${row.lyrics}`;

        // see if document already exists in database
        const { data, error } = await supabaseClient
          .from("documents")
          .select("id")
          .eq("title", row.title)
          .eq("artist", row.artist);
        if (error) console.log(error);
        // if document already exists, skip to next row
        if (data && data.length > 0) {
          console.log("skipping", row.title, row.artist, data);
          return null;
        }
        // OpenAI recommends replacing newlines with spaces for best results
        const songString = songStringObj
          .replace(/\n/g, " ")
          .trim()
          .toLowerCase();

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
          return null;
        }

        // grab embedding vector from response
        const [{ embedding }] = embeddingResponse.data.data;

        // Insert the document into the database, including embeddings
        return await supabaseClient.from("documents").insert({
          title: row.title,
          artist: row.artist,
          lyrics: row.lyrics,
          content: songString,
          embedding,
        });
      });

      // wait for all inserts to finish
      await Promise.all(allInsertsPromises);
    }
  }
  return new Response("ok");
}

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
