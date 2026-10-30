import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TUser } from "../../../pages/Home/types";

type TInitialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const useAuthCurrentToken = (state: RootState) => state.authSlice.token;
export const useAuthCurrentUser = (state: RootState) => state.authSlice.user;
