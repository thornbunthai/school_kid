import { combineReducers, configureStore } from "@reduxjs/toolkit";
import classSlice from "./class/class";
import studentSlice from "./student/student";

const reducer = combineReducers({
  student: studentSlice,
  class: classSlice,
});

const store = configureStore({
  reducer,
});

export default store;
