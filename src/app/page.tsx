// import { QueryAndSongList } from "@/components";

import { QueryAndSongList } from "@/components";

export default function Page() {
  return (
    <div className="container mx-auto mt-48 w-3/4">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-sky-600 rounded-lg blur opacity-25" />
      <div className="flex flex-col justify-center items-center ">
        <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-5xl font-bold ">
          LyricGPT
        </h1>

        <QueryAndSongList />
      </div>
    </div>
  );
}
