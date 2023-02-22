import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
export const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers: {
    setStudentList: (state, action) => {
      const data = action.payload;
      const sortData = [...data].map((v) => ({ ...v }));
      state.list = sortData.sort((a, b) => a.id - b.id).reverse();
    },
    createStudent: (state, action) => {
      const data = action.payload;
      state.list.push(data);
      state.list = state.list.sort((a, b) => a.id - b.id).reverse();
    },
    updateStudent: (state, action) => {
      const data = action.payload;
      state.list = state.list.map((v) => (v.id === data.id ? data : v));
    },
    deleteStudent: (state, action) => {
      const id = action.payload;
      state.list = state.list.filter((v) => v.id !== id);
    },
  },
});

export const { setStudentList, createStudent, updateStudent, deleteStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
