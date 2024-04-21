import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { IUser } from "../models/user/User";
import { IGrade } from "../models/grades/Grades";

interface IUserState {
    user: IUser | null;
    grades: Array<IGrade> | null;
}

const initialState: IUserState = {
    user: null,
    grades: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setGrades: (state, action: PayloadAction<Array<IGrade>>) => {
            state.grades = action.payload;
        }
    }
});

export default userSlice.reducer;

export const { logout, setUser, setGrades } = userSlice.actions;