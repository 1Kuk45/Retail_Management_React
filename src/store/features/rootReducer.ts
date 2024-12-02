import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice  from "./loaderSlice";
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
export const rootReducer= combineReducers({
    loader: LoaderSlice,
    cart: cartReducer,
    order: orderReducer,
});
