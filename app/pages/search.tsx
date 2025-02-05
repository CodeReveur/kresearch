const Search = () =>{
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-4 rounded-xl w-[60vw] gap-5">
           
        <div className="flex bg-[#00796b] justify-center flex-col py-5 w-full rounded-md">
          <h4 className="text-3xl font-medium mb-5 text-white text-center">
              <span className="material-symbols-outlined">notes</span>
              <span className="">Kamero Research Base</span> 
            </h4>
        <form action="/w-page/result" method="GET" className="flex justify-center w-full">
          <input type="search" name="search" id="" placeholder="Search for researches ..." className="w-[80%] text-gray-100 placeholder:text-gray-300 placeholder:font-medium border outline-none rounded-s-md border-r-0 px-4 py-2 bg-transparent border-slate-50"/>
          <button type="submit" className="text-center px-4 text-slate-200 border border-l-0 rounded-e-md border-slate-50 bg-teal-600"><i className="bi bi-search"></i></button>
        </form>
        <h4 className="text-center py-3 font-medium text-emerald-200">If it's not here, you don't need it</h4>
        </div>
        
      </div>

    </div>
  );
}
export default Search;