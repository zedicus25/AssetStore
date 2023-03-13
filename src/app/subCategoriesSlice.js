import api from '../apiAccess';

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'subCategories/getAll',
    async () => {
        const res = await api.getSubCategories();
        return res;
    }
);
export const addSubCategory = createAsyncThunk(
    'subCategories/addSubCategory',
    async (state) => {
        const res = await api.addSubCategory(state);
        return res;
    }
);
export const updateSubCategory = createAsyncThunk(
    'subCategories/updateSubCategory',
    async (state) => {
        const res = await api.updateSubCategory(state);
        return res;
    }
);
export const deleteSubCategory = createAsyncThunk(
    'subCategories/deleteSubCategory',
    async (state) => {
        const res = await api.deleteSubCategory(state);
        return res;
    }
);

export const subCategoriesSlice = createSlice({
    name: 'subCategories',
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
            });
    }
});


export const selectValues = (state) => state.subCategories.values;

export default subCategoriesSlice.reducer
