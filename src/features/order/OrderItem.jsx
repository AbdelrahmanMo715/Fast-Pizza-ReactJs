import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, ingredients , isLoadingIngredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      {isLoadingIngredients? "loading..." : <p className="text-sm text-stone-400 capitalize italic">{ingredients?.join(", ")}</p> }
    </li>
  );
}

export default OrderItem;
