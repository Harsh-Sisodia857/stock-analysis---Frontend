import Search from "../components/Search";
import whiteBg from "../assets/white_homebg.png";  
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setStock } from "../store/slice/stockSlice";
import { getStocks } from "../apiManager/stockApiManager";

function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${whiteBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stocks = await getStocks()
        console.log("Fetched Stocks:", stocks);  // Debugging
        dispatch(setStock(stocks));  // Store in Redux
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []); 
  

  return (
    <div className="flex items-center justify-center w-[100%] h-[80vh]" style={backgroundImageStyle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-5xl">
          Analyse your stock with all the data in one place
        </h1>
        <div className="text-[#0078ff] font-bold text-2xl py-4">
          Our Data will help you to pick better stocks for better return
        </div>
        <Search />
      </div>
    </div>
  );
}

export default Home;
