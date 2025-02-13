import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        className="bg-indigo-500 text-white font-medium py-2 px-4 rounded flex items-center"
        disabled
      >
        <svg
          className="mr-3 w-5 h-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
          ></path>
        </svg>
        Processing…
      </button>
    </div>
  );
}

export default Loader;
