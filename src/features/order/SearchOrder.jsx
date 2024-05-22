import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [Query,setQuery] = useState("");
    const Navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        Navigate(`/order/${Query}`);
        setQuery('');
    }
  return (
    <form onSubmit={handleSubmit}>
        <input className="bg-yellow-100 p-2 rounded-full
         placeholder:text-stone-500 
        w-28 sm:w-64 sm:focus:w-72 
        transition-all duration-300 focus:outline-none 
        focus:ring focus:ring-yellow-200"
         value={Query} 
         onChange={(e)=>setQuery(e.target.value)} 
         type="text" 
         placeholder="Search order #e"
         />
    </form>
  )
}

export default SearchOrder
