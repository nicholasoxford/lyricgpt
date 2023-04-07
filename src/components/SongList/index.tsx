export function SongListCard({ song }: { song: `${string} - ${string}` }) {
  return (
    <div className="relative md:min-w-[600px] mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-800 to-sky-900 rounded-lg blur opacity-25"></div>

      <div className="relative  px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center justify-start space-x-6">
        <div className="h-full flex justify-center items-center w-full">
          <p className="text-slate-800 text-3xl">{song}</p>
        </div>
      </div>
    </div>
  );
}
