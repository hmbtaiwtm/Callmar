import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../../../6-Shared";


export const fetchSendEmail = createAsyncThunk('email/fetchSendEmail', async (inputData: any) => {
    const { data } = await axios.post('user/email', inputData)
    return data
})

export const fetchRessPass = createAsyncThunk('email/fetchRessPass', async ({id, password}: {id: any, password: any}) => {
    const { data } = await axios.patch(`user/resetPassword/${id}`, {password})
    return data
})

interface data {
    status: string
    loading: boolean
    ressPass: boolean
}

const initialState: data = {
    status: 'loading',
    loading: false,
    ressPass: false
}

const sendEmail = createSlice({
    name: 'email',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchSendEmail.pending, (state) => {
            state.status = 'загрузка'
            state.loading = true
        })
        .addCase(fetchSendEmail.fulfilled, (state) => {
            state.status = 'отправлено'
            state.loading = false
        })
        .addCase(fetchSendEmail.rejected, (state) => {
            state.status = 'ошибка'
            state.loading = false
        })
        .addCase(fetchRessPass.pending, (state) => {
            state.status = 'загрузка'
            state.loading = true
            state.ressPass = false
        })
        .addCase(fetchRessPass.fulfilled, (state) => {
            state.status = 'отправлено'
            state.loading = false
            state.ressPass = true
        })
        .addCase(fetchRessPass.rejected, (state) => {
            state.status = 'ошибка'
            state.loading = false
            state.ressPass = false
        })
    },
})


export const sendEmailForUser = sendEmail.reducer