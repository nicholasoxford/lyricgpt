// import { QueryAndSongList } from "@/components";

import { CountUpFunction, QueryAndSongList } from "@/components";
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-r min-w-full from-blue-600/25 to-sky-600/25">
      <div className="md:container md:mx-auto  mx-6">
        <div className="flex flex-col justify-center items-center  ">
          <span className="text-sm text-yellow-200 font-medium mt-20 md:mt-40 mb-6  ">
            ( Pre-Alpha )
          </span>
          <div className=" flex ">
            <div className="rounded-xl bg-gray-400/50 p-2 flex flex-row   ">
              <CountUpFunction />{" "}
              <span className="ml-1">songs indexed and counting</span>
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 inline-block text-transparent bg-clip-text text-7xl md:text-8xl font-bold h-28 mt-8">
            LyricGPT{" "}
          </h1>

          <div className="mt-1 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 inline-block text-transparent bg-clip-text text-lg font-extrabold  ">
            A new way to search for music
          </div>

          <QueryAndSongList />
        </div>
      </div>
    </div>
  );
}
