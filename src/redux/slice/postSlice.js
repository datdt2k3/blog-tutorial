import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
export const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    postCount: 0,
    postDetail: {},
    status: "idle", // idle | loading | succeeded | error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.postList = action.payload.posts;
        state.postCount = action.payload.total;
      })
      .addCase(getPost.rejected, (state) => {
        state.status = "error";
      })
      .addCase(getDetailPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDetailPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.postDetail = action.payload;
      })
      .addCase(getDetailPost.rejected, (state) => {
        state.status = "error";
      })
      // tìm kiếm theo tác giả
      .addCase(getPostByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPostByUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.postList = action.payload.posts;
        state.postCount = action.payload.total;
      })
      .addCase(getPostByUser.rejected, (state) => {
        state.status = "error";
      })
  }
});

// Gọi bài viết
export const getPost = createAsyncThunk(
  "post/getPost",
  async ({query = "", skip}, { rejectWithValue }) => {
    const params = {
      q: query,
      limit: getEnv("VITE_LIMIT_POST"),
      skip,
    }
    let pathname = "/posts";
    if (query) {
      pathname = `/posts/search`;
    }
    let queryString = `?${new URLSearchParams(params).toString()}`;
   
    const response = await axios.get(`${getEnv("VITE_SERVER_API_URL")}/posts${queryString}`);
    if (response.status !== 200) {
      return rejectWithValue("Failed to fetch posts");
    }
    const data = await response.data;
    return data;
  }
);

// Gọi chi tiêt bài viết
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
// tìm kiếm theo tác giả
export const getPostByUser = createAsyncThunk(
  "post/getPostByUser",
  async (id, { rejectWithValue }) => {
    const response = await axios.get(`${getEnv("VITE_SERVER_API_URL")}/users/${id}/posts`);
    if (response.status !== 200) {
      return rejectWithValue("Failed to fetch post details");
    }
    const data = await response.data;
    return data;
  }
)

export const selectPostList = (state) => state.post.postList;
export const selectPostCount = (state) => state.post.postCount;
export const selectPostDetail = (state) => state.post.postDetail;
export const selectPostStatus = (state) => state.post.status;