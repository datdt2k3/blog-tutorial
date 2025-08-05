import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
export const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    postDetail: {},
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.postList = action.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getDetailPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDetailPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.postDetail = action.payload;
      })
      .addCase(getDetailPost.rejected, (state) => {
        state.status = "failed";
      });
  }
});

// 
export const getPost = createAsyncThunk(
  "post/getPost",
  async (query = "", { rejectWithValue }) => {
    let queryString = "";
    if(query) {
      queryString = `/search?q=${query}`;
    }
    const response = await axios.get(`${getEnv("VITE_SERVER_API_URL")}/posts${queryString}`);
    if (response.status !== 200) {
      return rejectWithValue("Failed to fetch posts");
    }
    const data = await response.data.posts;
    return data;
  }
);

// Fetch detail post by ID
export const getDetailPost = createAsyncThunk(
  "post/getDetailPost",
  async (id, { rejectWithValue }) => {
    const response = await axios.get(`${getEnv("VITE_SERVER_API_URL")}/posts/${id}`);
    if (response.status !== 200) {
      return rejectWithValue("Failed to fetch post details");
    }
    const data = await response.data;

    const responseDataUser = await axios.get(`${getEnv("VITE_SERVER_API_URL")}/users/${data.userId}`);

    if (responseDataUser.status === 200) {
      const user = await responseDataUser.data;
      data.user = user;
    }
    
    return data;
  }
)

export const selectPostList = (state) => state.post.postList;
export const selectPostDetail = (state) => state.post.postDetail;
export const selectPostStatus = (state) => state.post.status;