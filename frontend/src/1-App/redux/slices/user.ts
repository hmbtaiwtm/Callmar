import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../6-Shared";

export const fetchUserLogin = createAsyncThunk('userLogin/fetchUserLogin', async (inputData: any) => {
    const { data } = await axios.post('user/login', inputData)
    return data
})

export const fetchGetMeBytoken = createAsyncThunk('userLogin/fetchGetMeByToken', async () => {
    const { data } = await axios.get('user/getMeByToken')
    return data
})

export const fetchUserRegister = createAsyncThunk('userLogin/fetchUserRegister', async (inputData: any) => {
    const { data } = await axios.post('user/register', inputData)
    return data
})


interface data {
    data: object | null,
    status: string
}

const initialState: data = {
    data: null,
    status: 'loading'
}

const userLogin = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        logOut(state) {
            state.data = null
            state.status = 'loadin'
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchUserLogin.pending, (state) => {
            state.data = null,
            state.status = 'loading'
        })
        .addCase(fetchUserLogin.fulfilled, (state, action) => {
            state.data = action.payload,
            state.status = 'loaded'
        })
        .addCase(fetchUserLogin.rejected, (state) => {
            state.data = null,
            state.status = 'failed'
        })
        .addCase(fetchGetMeBytoken.pending, (state) => {
            state.data = null,
            state.status = 'loading'
        })
        .addCase(fetchGetMeBytoken.fulfilled, (state, action) => {
            state.data = action.payload,
            state.status = 'loaded'
        })
        .addCase(fetchGetMeBytoken.rejected, (state) => {
            state.data = null,
            state.status = 'failed'
        })
        .addCase(fetchUserRegister.pending, (state) => {
            state.data = null,
            state.status = 'loading'
        })
        .addCase(fetchUserRegister.fulfilled, (state, action) => {
            state.data = action.payload,
            state.status = 'loaded'
        })
        .addCase(fetchUserRegister.rejected, (state) => {
            state.data = null,
            state.status = 'failed'
        })
    },
})

export const { logOut } = userLogin.actions

export const isAuthUser = (state: any) => Boolean(state.login.data);

export const userSignIn = userLogin.reducer 