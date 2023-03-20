import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import productsReducer from "./productsSlice";
import filterReduser from "./filtersSlice";
import subCategoriesReducer from "./subCategoriesSlice";
import busketSlice  from "./busketSlice";
import ordersSlice from "./ordersSlice";

export const store = configureStore({
    reducer:{
        subCategories : subCategoriesReducer,
        products: productsReducer,
        categories: categoriesSlice,
        filter: filterReduser,
        busket: busketSlice,
        orders: ordersSlice
    }
});