import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
export const userSlice = createSlice({
  name: "users",
  initialState: {
    user:{},
    status: "idle", // idle | loading | succeeded | error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getAuthor.rejected, (state) => {
        state.status = "error";
      })
  }
});

// Fetch us post by ID
export const getAuthor = createAsyncThunk(
  "users/getAuthor",
  async (id, { rejectWithValue }) => {
    const response = await axios.get(`${getEnv("VITE_SERVER_API_URL")}/users/${id}`);

    if (response.status !== 200) {
      return rejectWithValue("Failed to fetch user");
    }
    const data = await response.data;
    return data;
  }
)

export const selectAuthorById = (state) => state.users.user;
export const selectAuthorStatus = (state) => state.users.status;
