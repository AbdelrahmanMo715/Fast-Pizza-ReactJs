// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from './UpdateOrder';
import { useEffect } from "react";



function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();
    useEffect(()=>{
        if(!fetcher.data && fetcher.state === "idle"){
          fetcher.load("/menu")
        }
    },[fetcher])
    console.log(fetcher.data)
  return (
    <div className="px-3 py-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold "># {id} Status</h2>

        <div className="space-x-3 ">
          {priority && <span className="px-3 py-1 bg-red-500 text-red-50 rounded-full uppercase tracking-wide">Priority</span>}
          <span className="px-3 py-1 bg-green-500 text-green-50 rounded-full uppercase tracking-wide">  {status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-5 py-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-300 border-t border-b">
            {cart?.map((item)=> <OrderItem item={item} key={item.id} isLoadingIngredients={fetcher.state === "loading"} ingredients={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients}/>)}
      </ul>

      <div className=" bg-stone-200 px-5 py-6 space-y-3">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold text-stone-800">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>

      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}){
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
