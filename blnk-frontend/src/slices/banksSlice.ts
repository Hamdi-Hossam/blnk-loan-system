import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BanksState {
  banks: string[];
}

// Function to get banks from localStorage
const getBanksFromLocalStorage = (): string[] => {
  if (typeof window !== "undefined") {
    const storedBanks = localStorage.getItem("banks");
    return storedBanks ? JSON.parse(storedBanks) : [];
  }
  return []; // Return an empty array if not in the browser
};

const initialState: BanksState = {
  banks: getBanksFromLocalStorage(),
};

const banksSlice = createSlice({
  name: "banks",
  initialState,
  reducers: {
    addBank(state, action: PayloadAction<string>) {
      state.banks.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("banks", JSON.stringify(state.banks));
      }
    },
    removeBank(state, action: PayloadAction<string>) {
      state.banks = state.banks.filter((bank) => bank !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("banks", JSON.stringify(state.banks));
      }
    },
  },
});

export const { addBank, removeBank } = banksSlice.actions;
export default banksSlice.reducer;
