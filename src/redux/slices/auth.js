import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("/auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
}); //in params will be stored email and password (and read info from params before email and password will be stored)

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
}); //I don't need the param, because axios will automatically get the token and pass it on.(in axios.js => config.headers.Authorization = window.localStorage.getItem("token"))

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }, //exit from account
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null; //loading
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload; //request succeeded
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null; //loading
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload; //request succeeded
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data); //get state and checks if I have data in auth

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
