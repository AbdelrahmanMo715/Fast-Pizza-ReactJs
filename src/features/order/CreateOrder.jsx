import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  
  // const cart = fakeCart;
  const cart = useSelector(getCart);
  const {userName,status,position,address,error} = useSelector((store)=> store.user);

  const isLoadingPosition = status === "loading";
  console.log(address)
  const Navigation = useNavigation();
  const isSubmitting = Navigation.state === "submitting";
  const formErrors = useActionData();
  const totalPrice = useSelector(getTotalPrice);
  
  const [withPriority, setWithPriority] = useState(false);
  const priority = withPriority ? totalPrice * 0.2 : 0;
  const totalPriceWithPriority = totalPrice + priority;
  const dispatch = useDispatch();
  if(cart.length === 0) return <EmptyCart/>
  return (
    <div className="mt-5 p-4">
      <h2 className="font-semibold mb-5 text-xl">Ready to order? Let's go!</h2>
      
      <Form method="POST">

        <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:gap-1">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
          <input  className="input" defaultValue={userName} type="text" name="customer" required />
          </div>
         
        </div>

        <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:gap-1">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow m-0">
            <input className="input"  type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs text-red-700 font-bold bg-red-200 rounded-md px-2 mt-1">{formErrors.phone}</p>} 
          </div>
         
        </div>

        <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:gap-1 relative">
          <label className="sm:basis-40" >Address</label>
          <div className="grow">
            <input className="input"
             type="text" 
             name="address"
             required 
             defaultValue={address}
            />
            {status === "error" && <p className="text-xs text-red-700 font-bold bg-red-200 rounded-md px-2 mt-1">{error}</p>} 
          </div>
          {!position.latitude && !position.longitude ? 
            <Button type="small"
          disabled={isLoadingPosition}
           onClick={(e)=>{
            e.preventDefault()
            dispatch(fetchAddress())
          }}
           >
           get position
           </Button>
           : null
          }
          
           
        </div>

        <div className="flex gap-3 items-center mb-5">
          <input
            className = "w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-100"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
        <input type="hidden" name="position" value={position.latitude && position.longitude ?`${position.latitude},${position.longitude}` : ""}/>
          <Button type="primary"
           disabled={isSubmitting}
           >
           {isSubmitting ? "Placing Order..." : `Order now ${formatCurrency(totalPriceWithPriority)}`}
           </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData); 
  const order = {
    ...data,  
    priority : data.priority === 'true',
    cart : JSON.parse(data.cart),

  }
  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone)){
    errors.phone = "Please enter correct phone number we might need it to contact you !";
  }
  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());
  
  return  redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
