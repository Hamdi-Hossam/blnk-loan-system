import { UserState } from "@/types/UserState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: UserState = {
  first_name: "",
  last_name: "",
  username: "",
  isLoggedIn: false,
};

const loadState = (): UserState | undefined => {
  const userState = Cookies.get("userState");
  if (userState) {
    return JSON.parse(userState);
  }
  return undefined;
};

const userSlice = createSlice({
  name: "user",
  initialState: loadState() || initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
      Cookies.set("userState", JSON.stringify(state));
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
      Cookies.remove("userState");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
