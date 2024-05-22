import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantity } from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

// eslint-disable-next-line react/prop-types
function MenuItem({ pizza }) {
  // eslint-disable-next-line react/prop-types
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(id))


  const isInCart = currentQuantity > 0;

  function handleAddToCart(){
    console.log(id)
    const newItem = {
      pizzaId : id,
      name,
      quantity : 1,
      unitPrice,
      totalPrice : unitPrice * 1
    }
    dispatch(addItem(newItem))
  }
  return (
    <li className="flex gap-4 py-3">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale" : "" }`} />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-600 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p className="uppercase font-medium text-sm text-stone-500">Sold out</p>}
          {isInCart ? 
            <div className="flex gap-6 items-center">
            <UpdateItemQuantity pizzaId={id} quantity={currentQuantity}/>
            <DeleteButton pizzaId={id}/>
          </div> : null}
          {!soldOut && !isInCart ? <Button onClick={handleAddToCart} type="small">Add To Cart</Button> : null}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
