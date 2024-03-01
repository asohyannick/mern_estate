import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart:(state) => {
      state.loading = true;
    },
    deleteUserSuccess:(state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure:(state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserStart:(state) => {
      state.loading = true;
    },
    signOutUserSuccess:(state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure:(state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    showListingStart:(state) => {
      state.loading = true;
    },
    showListingSuccess:(state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    showListingFailure:(state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { 
  signInStart, 
  signInSuccess, 
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  showListingStart,
  showListingSuccess,
  showListingFailure
 } = userSlice.actions;
export default userSlice.reducer;
