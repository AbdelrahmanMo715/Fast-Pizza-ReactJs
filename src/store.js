import { configureStore } from "@reduxjs/toolkit";

import UserReducer from './features/user/userSlice';
import CartReducer from './features/cart/cartSlice';
const store = configureStore({
  reducer : {
    user : UserReducer,
    cart : CartReducer
  }
})

export default store;