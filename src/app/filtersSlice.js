import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name:'filter',
    initialState: {
        values:{
            page: 1,
            perPage: 10,
            category: null,
            subCategories: [],
            minPrice: null,
            maxPrice: null
        }
    },
    reducers: {
        setCategory:(state, action) => {
            state.values.category = action.payload;
        },   

        setPage:(state, action) => {
            state.page = action.payload;
        },
        setPerPage:(state, action) => {
            state.values.perPage = action.payload;
        },

        incrementPage: (state) => {
            state.values.page += 1;
        },
        
        decrementPage: (state) => {
            state.page -= 1;
        },
        
        setSubCategories: (state, action) => {
            state.values.subCategories = action.payload.filter(item => item.isChecked);
        },
        setMinPrice: (state, action) => {
            state.values.minPrice = action.payload;
        },

        setMaxPrice: (state, action) => {
            state.values.maxPrice = action.payload;
        },
    }
});

export const { setCategory, setPage, setPerPage, incrementPage, decrementPage, setMinPrice, setMaxPrice } = filterSlice.actions

export const selectPage = (state) => state.filter.values.page;
export const selectPerPage = (state) => state.filter.values.perPage;
export const selectMinPrice = (state) => state.filter.values.minPrice;
export const selectMaxPrice = (state) => state.filter.values.maxPrice;
export const selectSubCategories = (state) => state.filter.values.subCategories;
export const selectCategory = (state) => state.filter.values.category;


export default filterSlice.reducer