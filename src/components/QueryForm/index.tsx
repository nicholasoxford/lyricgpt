"use client";
import { Dispatch, FormEvent, SetStateAction } from "react";

export function QueryForm({
  setSongList,
  setFetched,
  setIsLoading,
}: {
  setSongList: Dispatch<SetStateAction<`${string} - ${string}`[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setFetched: Dispatch<SetStateAction<boolean>>;
}) {
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> & {
      target: {
        query: HTMLInputElement;
      };
    }
  ) => {
    console.log("hello");
    setIsLoading(true);
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      query: event.target.query.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/searchVector";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    setSongList(result.uniqueSongs);
    setIsLoading(false);
    setFetched(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className=" flex w-full  flex-col items-center mb-3 mt-4 justify-center">
          <input
            type="text"
            autoComplete="false"
            id="query"
            name="query"
            placeholder="Happy rap songs"
            className="px-3 py-3 w-full md:w-[600px]  placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring-sky-800 focus:ring hover:ring hover:ring-sky-800 pr-10"
          />
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <i className="fas fa-user"></i>
          </span>
          <button hidden type="submit"></button>
          <button className="mt-8 w-48 rounded-xl bg-slate-700/50 hover:bg-slate-800/50 h-8 cursor-pointer">
            Search
          </button>
        </div>
      </form>
    </>
  );
}
