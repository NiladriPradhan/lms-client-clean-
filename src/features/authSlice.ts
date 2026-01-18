import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type User = {
  role: string;
  id: string;
  name: string;
  email: string;
  bio?: string;
  photoUrl?: string;
} | null;
type TState = {
  user: User | null;
  isAuthenticated: boolean;
};
const initialState: TState = {
  user: null,
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    userLoogedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { userLoggedIn, userLoogedOut } = authSlice.actions;
export default authSlice.reducer;
