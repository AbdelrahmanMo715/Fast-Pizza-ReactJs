import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const UserName = useSelector((store) => store.user.userName)
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl md:text-2xl px-4 text-semibold text-stone-800">
        The best pizza.
        <br />
        <span className="text-yellow-500">
                Straight out of the oven, straight to you.
        </span>
      </h1>
      {!UserName? <CreateUser/> : <Button type="primary" to="/menu">Continue Ordering...</Button>}
      
    </div>
  );
}

export default Home;
