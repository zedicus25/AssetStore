import { createSlice } from "@reduxjs/toolkit";

export const busketSlice = createSlice({
    name:'busket',
    initialState:{
        products: []
    },
    reducers: {
        addProduct:(state, action) => {
            let prod = {
                productId: action.payload.productId,
                productName: action.payload.productName, 
                productPrice: action.payload.productPrice,
                productImage: action.payload.productImage,
                productCount: 1
            };
            if(state.products.some(e => e.productId === prod.productId) <= 0){
                state.products.push(prod);
            }
        },   
        increaseProductCount:(state, action) => {

        },
        decreaseProductCount:(state, action) => {

        },
        removeProduct:(state, action) => {
            let ele = state.products.find(p => p.id === action.payload.producId);
            let ind = state.products.indexOf(ele);
            state.products.splice(ind, 1);
        } 
      
    }
});

export const { addProduct,removeProduct } = busketSlice.actions;

export const selectProducts = (state) => state.busket.products;


export default busketSlice.reducer
