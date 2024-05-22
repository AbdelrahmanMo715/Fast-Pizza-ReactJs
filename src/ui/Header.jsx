import { Link } from "react-router-dom"
import SearchOrder from "../features/order/SearchOrder"
import UserName from "../features/user/UserName"

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 uppercase px-3 py-4 border-b-2 border-stone-400">
        <Link className="font-semibold" to="/">Fast React Pizza Co.</Link>
        <SearchOrder/>
        <UserName/>
    </header>
  )
}

export default Header
