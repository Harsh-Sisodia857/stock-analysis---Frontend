import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slice/searchQuerySlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Search() {
  const [searchText, setSearchText] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  
  const navigate = useNavigate(); 
  const { stocks: stockData } = useSelector((state) => state.stocks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTicker) {
      handleSearch();
    }
  }, [selectedTicker]);

  
  useEffect(() => {
    if (searchText.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = stockData.filter(
      (stock) =>
        stock.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
        stock.ticker.toLowerCase().startsWith(searchText.toLowerCase())
    );

    setSuggestions(filtered);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  }, [searchText, stockData]); 

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    try {
      console.log("Handle search is called : ", selectedTicker)
      if (selectedTicker) {
        dispatch(setSearchQuery(searchText));
        setShowSuggestions(false);
        navigate(`/company/${selectedTicker}`);
      }
    } catch (error) {
      console.error("Error searching stock :", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const newIndex = prev < suggestions.length - 1 ? prev + 1 : prev;
        setSelectedTicker(suggestions[newIndex]?.ticker || ""); 
        return newIndex;
      });
    } 
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : 0;
        setSelectedTicker(suggestions[newIndex]?.ticker || ""); 
        return newIndex;
      });
    } 
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        setSearchText(suggestions[selectedIndex].name);
        setSelectedTicker(suggestions[selectedIndex].ticker);
        setShowSuggestions(false);
        dispatch(setSearchQuery(suggestions[selectedIndex].name));
      } else {
        handleSearch();
      }
    } 
    else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    setSelectedTicker(() => suggestion.ticker); 
    setShowSuggestions(false);
    dispatch(setSearchQuery(suggestion.name));
  };

  return (
    <div>
      <div className="w-full max-w-sm min-w-[500px]">
        <div className="relative" ref={suggestionsRef}>
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type a Company Name or Brand to Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              searchText &&
              suggestions.length > 0 && 
              setShowSuggestions(true)
            }
          />
          <button
            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.ticker}
                  className={`px-3 py-2 cursor-pointer hover:bg-slate-100 ${
                    index === selectedIndex ? "bg-slate-100" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{suggestion.name}</span>
                    <span className="text-slate-500">{suggestion.ticker}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;