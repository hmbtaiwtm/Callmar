import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userSignIn } from "./slices/user";
import { sendEmailForUser } from "./slices/email";

export const store = configureStore({
    reducer: {
        login: userSignIn,
        email: sendEmailForUser
    }
}) 



export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
