import api from '../apiAccess';

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


export const getAsync = createAsyncThunk(
    'products/getAll',
    async () => {
        const res = await api.getAllAssets();
        return res;
    }
);

export const getPopularAsync = createAsyncThunk(
    'products/getPopulars',
    async () => {
        const res = await api.getPopularAssets();
        return res;
    }
)

export const getProductsInCategory = createAsyncThunk(
    'products/getProductsInCategory',
    async(state) => {
        const res = await api.getProductsInCategory(state);
        return res;
    }
)

export const getProductsInPage = createAsyncThunk(
    'products/getProductInPage',
    async(state) => {
        const res = await api.getProductsInPage(state);
        return res;
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async(state) => {
        const res = await api.searchProducts(state);
        return res;   
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async(state) => {
        const res = await api.addProduct(state);
        return res;
    }
);
export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async(state) => {
        const res = await api.updateProduct(state);
        return res;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        values : [],
        result: {},
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder.addCase(getAsync.pending, (state) =>{
                state.status = 'loading';
            }).addCase(getAsync.fulfilled, (state, action) => {
                state.values = [];
                state.status = 'idle';
                state.values = action.payload;
            }).addCase(getPopularAsync.pending, (state) =>{
                state.status = 'loading';
            }).addCase(getPopularAsync.fulfilled, (state, action) => {
                state.values = [];
                state.status = 'idle';
                state.values = action.payload;
            }).addCase(getProductsInCategory.pending, (state) => {
                state.status = 'loading';
            }).addCase(getProductsInCategory.fulfilled, (state, action) => {
                state.values = [];
                state.status = 'idle';
                state.values = action.payload;
            }).addCase(searchProducts.pending, (state) => {
                state.status = 'loading';
            }).addCase(searchProducts.fulfilled, (state, action) => {
                state.values = [];
                state.status = 'idle';
                state.values = action.payload;
            }).addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            }).addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
            }).addCase(getProductsInPage.pending, (state) => {
                state.status = 'loading';
            }).addCase(getProductsInPage.fulfilled, (state, action) =>{
                state.values = [];
                state.status = 'idle';
                state.values = action.payload;
            }).addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
            }).addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
            });
    }
});


export const selectValues = (state) => state.products.values;

export const selectResult = (state) => state.products.result;

export default productsSlice.reducer