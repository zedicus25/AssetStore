import api from '../apiAccess';

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async() => {
        const res = await api.getUsers();
        return res;
    }
);
export const getManagers = createAsyncThunk(
    'users/getManagers',
    async() => {
        const res = await api.getManagers();
        return res;
    }
);
export const getAdmins = createAsyncThunk(
    'users/getAdmins',
    async() => {
        const res = await api.getAdmins();
        return res;
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async(state) => {
        const res = await api.deleteUser(state);
        return res;
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        values : [],
        status: 'idle'
    },
    extraReducers:(builder) => {
        builder.addCase(getUsers.pending, (state) =>{
            state.values = [];
            state.status = 'loading';
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'idle';
            state.values = action.payload;
        }).addCase(getAdmins.pending, (state) =>{   
            state.values = [];
            state.status = 'loading';
        }).addCase(getAdmins.fulfilled, (state, action) => {
            state.status = 'idle';
            state.values = action.payload;
        }).addCase(getManagers.pending, (state) =>{
            state.values = [];
            state.status = 'loading';
        }).addCase(getManagers.fulfilled, (state, action) => {
            state.status = 'idle';
            state.values = action.payload;
        }).addCase(deleteUser.pending, (state) => {
            state.status = 'loading';
        }).addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'idle';
            return state;
        });
    }
});


export const selectValues = (state) => state.users.values;

export default usersSlice.reducer
