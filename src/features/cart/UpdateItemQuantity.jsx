import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';


function UpdateItemQuantity({pizzaId,quantity}) {
    const dispatch = useDispatch();
  return (
    <div className='flex gap-4 ml-auto'>
      <Button onClick={()=>dispatch(increaseItemQuantity(pizzaId))} type="round">+</Button>
        <p className='font-semibold '>{quantity}</p>
      <Button onClick={()=>dispatch(decreaseItemQuantity(pizzaId))} type="round">-</Button>
    </div>
  )
}

export default UpdateItemQuantity
