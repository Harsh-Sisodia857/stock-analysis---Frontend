import { useState } from "react";
function InfoButton({ text }) {
    const [show, setShow] = useState(false);
  
    return (
      <div className="relative inline-block">
        <button
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="ml-2 p-1 w-7 h-7 rounded-full bg-gray-200 text-blue-600 italic hover:bg-gray-300 flex items-center justify-center"
        >
          i
        </button>
        {show && (
          <div className="absolute left-10 top-0 mt-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
            {text}
          </div>
        )}
      </div>
    );
  }
export default InfoButton;
