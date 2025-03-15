import { useState } from "react";

function InfoButton({ text }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="ml-1 w-5 h-5 cursor-pointer rounded-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="More information"
      >
        i
      </button>
      
      {show && (
        <div 
          className="absolute left-8 top-0 z-10 w-64 p-3 bg-white text-gray-700 text-sm rounded-md shadow-lg border border-gray-200 animate-fade-in"
          style={{
            maxWidth: "calc(100vw - 100px)",
            transform: "translateY(-30%)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
        >
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-white"></div>
          <p className="leading-relaxed">{text}</p>
        </div>
      )}
    </div>
  );
}

export default InfoButton;