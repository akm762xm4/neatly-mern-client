import { createSlice } from "@reduxjs/toolkit";
import { User } from ".";

export interface NullUser {
  username: null;
  email: null;
}
const user: User | NullUser = {
  email: null,
  username: null,
};

const userReducers = createSlice({
  name: "user",
  initialState: user,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    removeLoggedInUser: (state) => {
      state.username = null;
      state.email = null;
    },
  },
});

export default userReducers.reducer;
export const { setLoggedInUser, removeLoggedInUser } = userReducers.actions;
