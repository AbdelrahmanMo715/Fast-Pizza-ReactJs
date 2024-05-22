import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader";

function AppLayout() {
    const Navigation = useNavigation();
    const isLoading = Navigation.state === "loading";
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
    {isLoading && <Loader/>}
    <Header/>
    <div className="overflow-auto">
    <main className="max-w-3xl mx-auto">
        <Outlet/>
    </main>
    </div>
    
    <CartOverview/>
    </div>
  )
}

export default AppLayout
