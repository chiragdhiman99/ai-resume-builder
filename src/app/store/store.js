import { configureStore } from "@reduxjs/toolkit";
import signupdataReducer from "./formdata.js";

export const store = configureStore({
  reducer: {
    signupdata: signupdataReducer,
  },
});
