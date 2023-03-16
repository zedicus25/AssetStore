import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name:'filter',
    initialState: {
        values:{
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
        
        setSubCategories: (state, action) => {
            
            if(action.payload.checked)
                state.values.subCategories.push(action.payload.id);
            else{
                let index = state.values.subCategories.indexOf(action.payload.id);
                state.values.subCategories.splice(index,1);
            }

        },
        setMinPrice: (state, action) => {
            state.values.minPrice = action.payload;
        },

        setMaxPrice: (state, action) => {
            state.values.maxPrice = action.payload;
        },
    }
});

export const { setSubCategories,setCategory, setMinPrice, setMaxPrice } = filterSlice.actions

export const selectMinPrice = (state) => state.filter.values.minPrice;
export const selectMaxPrice = (state) => state.filter.values.maxPrice;
export const selectSubCategories = (state) => state.filter.values.subCategories;
export const selectCategory = (state) => state.filter.values.category;


export default filterSlice.reducer