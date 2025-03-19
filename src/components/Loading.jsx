import React from "react";
import {  Loader } from "lucide-react";

function Loading({message = "Please wait, we are fetching data!!"}) {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <Loader className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
      <p className="text-gray-600">{message}...</p>
    </div>
  );
}

export default Loading;
