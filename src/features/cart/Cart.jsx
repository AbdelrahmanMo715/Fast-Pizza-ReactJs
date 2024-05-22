import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from '../cart/CartItem';
import EmptyCart from './EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalQuantity } from './cartSlice';


function Cart() {
  // const cart = fakeCart;
  const UserName = useSelector((store) => store.user.userName);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  function handleClearCart(){
    dispatch(clearCart());
  }
    if(!cart.length) return <EmptyCart/>
  return (
    <div className='px-2'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='text-xl font-semibold mt-4'>Your cart, {UserName}</h2>
      <ul className='divide-y divide-stone-300 border-b mb-5'>
      {cart.map((item) => <CartItem item={item} key={item.pizzaId}/>)}
   
      </ul>
      <div className='mt-7 space-x-4'>
        <Button type="primary" to="/order/new">Order pizzas</Button>
        <Button onClick={handleClearCart}  type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
