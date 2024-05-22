import Button from '../../ui/Button';
import {formatCurrency} from '../../utils/helpers';
import DeleteButton from './DeleteButton';
import UpdateItemQuantity from './UpdateItemQuantity';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
 
  return (
    <li className='py-4'>
      <p className='font-semibold'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between gap-5'>
        <p className='text-sm'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity}/>
        <DeleteButton pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
