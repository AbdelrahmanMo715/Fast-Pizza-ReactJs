import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers :{
        addItem(state,action){
            state.cart.push(action.payload);
        },
        deleteItem(state,action){
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
        },
        clearCart(state){
            state.cart = [];
        },
        increaseItemQuantity(state,action){
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state,action){
            const item = state.cart.find((item) => item.pizzaId === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state,action)
        },
    }
})

export const {addItem,deleteItem,clearCart,increaseItemQuantity,decreaseItemQuantity} = cartSlice.actions 

export default cartSlice.reducer;

export const getCart =(state) => state.cart.cart;

export const getTotalQuantity = (state) => 
state.cart.cart.reduce((sum,cur) =>sum + cur.quantity,0 )

export const getTotalPrice = (state) => 
    state.cart.cart.reduce((sum,cur) =>sum + cur.totalPrice,0 )

export const getCurrentQuantity = (id) => (state) => state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0 ;

    