"use client";
import { useState } from "react";
import { QueryForm } from "../QueryForm";
import { SongListCard } from "../SongList";
import { Loading } from "../Loading";

export function QueryAndSongList() {
  const [isLoading, setIsLoading] = useState(false);
  const [songList, setSongList] = useState<`${string} - ${string}`[]>([]);

  return (
    <>
      <QueryForm setSongList={setSongList} setIsLoading={setIsLoading} />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-y-8 mt-4">
          {songList.map((song, index) => {
            return (
              <div key={index}>
                <SongListCard song={song} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
