import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        pendingUserReducer(state, action) {
            console.log(action)
            return action.payload
        },
        allUsersReducer(state, action) {
            console.log(action)
            return action.payload
        },
        rejectedUsersReducer(state, action) {
            return action.payload
        },
        approvedUsersReducer(state, action) {
            return action.payload
        },
    }
})

export default userSlice.reducer
export const { pendingUserReducer, allUsersReducer, rejectedUsersReducer, approvedUsersReducer } = userSlice.actions