import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/hook";
import { AuthUser } from "../../types/User";


const initialState : {authUser: AuthUser | undefined} = {
    authUser: undefined
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {            
            state.authUser = action.payload
        },
        userLoggedOut: (state) => {            
            state.authUser = undefined
        }
    }
})

export function getAuthUser() {
    return useAppSelector(state => state.user.authUser)
}

export const {
    userLoggedIn,
    userLoggedOut
} = userSlice.actions

export default userSlice.reducer