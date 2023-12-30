import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-rose-500 text-[2rem] font-semibold">
                Todo List
              </h1>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs flex justify-center items-center">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-[26rem] rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  type="search"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Link to={`/api/v1/search?q=${searchText}`}>
                <button
                  type="button"
                  className="ml-4 bg-white rounded-lg py-1.5 pl-4 pr-3 cursor-pointer"
                >
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
