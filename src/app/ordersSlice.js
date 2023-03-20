
import api from '../apiAccess';

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async(state) => {
        const res = await api.addOrder(state);
        return res;
    }
)

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        values : [],
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder.addCase(createOrder.pending, (state) =>{
                state.status = 'loading';
            }).addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'idle';
                state.values = action.payload;
            });
    }
});

export default ordersSlice.reducer