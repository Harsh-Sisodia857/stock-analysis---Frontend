
function Stocks() {
  return (
    <div>
        <div className="mini-navigation">
            <a className="text-[#007bff] bg-transparent " href="/">Stock Analysis</a>
            <span>{">"}</span>
            <a className="text-[#007bff] bg-transparent " href="/companies">Company</a>
            <span>{">"}</span>
            <a className="text-[#007bff] bg-transparent " href="/:company">{"company name"}</a>
        </div>
        <h1 className="font-bold text-2xl">Company Name</h1>
    </div>
  )
}

export default Stocks