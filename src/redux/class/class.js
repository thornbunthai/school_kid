import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
export const classSlice = createSlice({
  name: "classSlice",
  initialState,
  reducers: {
    setClass: (state, action) => {
      const data = action.payload;
      const sortData = [...data].map((v) => ({ ...v }));
      state.list = sortData.sort((a, b) => a.id - b.id).reverse();
    },
    createClass: (state, action) => {
      const data = action.payload;
      state.list.push(data);
      state.list = state.list.sort((a, b) => a.id - b.id).reverse();
    },
    updateClass: (state, action) => {
      const data = action.payload;
      state.list = state.list.map((v) => (v.id === data.id ? data : v));
    },
    deleteClass: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((v) => v.id !== id);
    },
  },
});

export const { setClass, createClass, updateClass, deleteClass } =
  classSlice.actions;
export default classSlice.reducer;
