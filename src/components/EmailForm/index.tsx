"use client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

export function EmailForm({}: {}) {
  const [emailSent, setEmailSent] = useState(false);
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> & {
      target: {
        email: HTMLInputElement;
      };
    }
  ) => {
    setLoading(true);
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      email: event.target.email.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/addEmail";

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
    setEmailSent(true);
    setLoading(false);
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
  };
  if (Loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-slate-400 "></div>
      </div>
    );
  }
  return (
    <>
      {emailSent ? (
        <div>
          <h1 className="text-2xl text-center">Thanks for signing up!</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className=" flex w-full  flex-row items-center mb-3 mt-4 justify-center">
            <input
              type="email"
              autoComplete="false"
              id="email"
              name="email"
              placeholder="Submit email to learn more"
              className="px-3 py-3 w-full md:w-64 opacity-80 rounded-2xl  placeholder-slate-300 text-slate-600 relative bg-white  text-sm border-0 shadow-xl outline-none focus:outline-none focus:ring-sky-800 focus:ring hover:ring hover:ring-sky-800 pr-10"
            />
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
              <i className="fas fa-user"></i>
            </span>
            <button hidden type="submit"></button>
          </div>
        </form>
      )}
    </>
  );
}
