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
                localStorage.setItem('busket',JSON.stringify(state.products));
            }
        },   
        increaseProductCount:(state, action) => {
            let ele = state.products.find(p => p.productId === action.payload.productId);
            if(ele){
                ele.productCount = parseInt(ele.productCount+1);
                localStorage.setItem('busket',JSON.stringify(state.products));
            }

        },
        decreaseProductCount:(state, action) => {
            let ele = state.products.find(p => p.productId === action.payload.productId);
            if(ele){
                if(ele.productCount > 1){
                    ele.productCount = parseInt(ele.productCount-1);
                    localStorage.setItem('busket',JSON.stringify(state.products));
                }
            }
        },
        setItemCount:(state, action) => {
            let ele = state.products.find(p => p.productId === action.payload.productId);
            if(ele){
                if(action.payload.productCount > 0 && action.payload.productCount < 50){
                    ele.productCount = parseInt(action.payload.productCount);
                    localStorage.setItem('busket',JSON.stringify(state.products));
                }
            }
        },
        removeProduct:(state, action) => {
            let ele = state.products.find(p => p.id === action.payload.productId);
            let ind = state.products.indexOf(ele);
            state.products.splice(ind, 1);
            localStorage.setItem('busket',state.products);
        },
        setBusket:(state, action) => {
            state.products = action.payload.products;
        }
      
    }
});

export const { addProduct,removeProduct, setBusket, increaseProductCount, decreaseProductCount, setItemCount } = busketSlice.actions;

export const selectProducts = (state) => state.busket.products;
export const selectTotalPrice = (state) => {
    let price = 0;
    state.busket.products.map(x => price += x.productPrice * x.productCount);
    return parseFloat(price).toFixed(2);
}


export default busketSlice.reducer
