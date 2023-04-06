"use client";
import { Dispatch, FormEvent, SetStateAction } from "react";

export function QueryForm({
  setSongList,
  setIsLoading,
}: {
  setSongList: Dispatch<SetStateAction<`${string} - ${string}`[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> & {
      target: {
        query: HTMLInputElement;
      };
    }
  ) => {
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
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative flex w-[400px] flex-wrap items-stretch mb-3 mt-4 justify-center">
          <input
            type="text"
            id="query"
            name="query"
            placeholder="Happy rap songs"
            className="px-3 py-3 w-full placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring hover:ring pr-10"
          />
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <i className="fas fa-user"></i>
          </span>
          <button hidden type="submit"></button>
        </div>
      </form>
    </>
  );
}
