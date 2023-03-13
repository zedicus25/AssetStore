import api from '../apiAccess';

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'categories/getAll',
    async () => {
        const res = await api.getCategories();
        return res;
    }
);

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (state) => {
        const res = await api.addCategory(state);
        return res;
    }
);

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async (state) => {
        const res = await api.updateCategory(state);
        return res;
    }
);

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (state) => {
        const res = await api.deleteCategory(state);
        return res;
    }
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        values : [],
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder.addCase(getAsync.pending, (state) =>{
                state.status = 'loading';
            }).addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.values = action.payload;
            }).addCase(addCategory.pending, (state) => {
                state.status = 'loading';
            }).addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
            });
    }
});


export const selectValues = (state) => state.categories.values;

export default categoriesSlice.reducer
