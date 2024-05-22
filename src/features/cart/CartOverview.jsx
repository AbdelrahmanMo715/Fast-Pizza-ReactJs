import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {formatCurrency} from "../../utils/helpers";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

    if (!totalQuantity) return null;
  return (
    <div className="bg-stone-800 text-stone-200 p-4 flex justify-between items-center">
      <p className="space-x-4">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
