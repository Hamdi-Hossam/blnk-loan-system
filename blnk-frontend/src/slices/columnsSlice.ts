import { ColumnsState } from "@/types/ColumnsState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ColumnsState = {
  columns: [],
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<string[]>) {
      state.columns = action.payload;
    },
    clearColumns(state) {
      state.columns = [];
    },
  },
});

export const { setColumns, clearColumns } = columnsSlice.actions;
export default columnsSlice.reducer;
