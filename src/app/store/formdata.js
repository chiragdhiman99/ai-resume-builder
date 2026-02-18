import { createSlice } from "@reduxjs/toolkit";

const saveddata = localStorage.getItem("userdata");

const initialState = saveddata
  ? JSON.parse(saveddata)
  : {
      name: "",
      email: "",
    };

const formdataslice = createSlice({
  name: "signupdata",
  initialState,
  reducers: {
    signupData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem(
        "userdata",
        JSON.stringify({
          name: state.name,
          email: state.email,
        }),
      );
    },
  },
});

export const { signupData } = formdataslice.actions;
export default formdataslice.reducer;
