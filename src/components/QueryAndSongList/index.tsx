"use client";
import { useState } from "react";
import { QueryForm } from "../QueryForm";
import { SongListCard } from "../SongList";
import { Loading } from "../Loading";

export function QueryAndSongList() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasFeteched, setFetched] = useState<boolean>(false);
  const [songList, setSongList] = useState<`${string} - ${string}`[]>([]);

  return (
    <>
      <QueryForm
        setSongList={setSongList}
        setIsLoading={setIsLoading}
        setFetched={setFetched}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-y-8 mt-4 mb-4">
          {songList.map((song, index) => {
            return (
              <div key={index}>
                <SongListCard song={song} />
              </div>
            );
          })}

          {hasFeteched && songList.length === 0 && (
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-400">
                No results found
              </div>
              <div className="text-lg text-gray-400">
                We are working hard every day to improve our search results.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
