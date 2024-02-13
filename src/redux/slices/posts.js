import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "/posts/fetchRemovePost",
  async (id) => {
    const res = await axios.delete(`/posts/${id}`);
    return res.data;
  }
);

export const fetchSortByNewest = createAsyncThunk(
  "posts/fetchSortByNewest",
  async () => {
    await axios.get(`/posts`);
  }
);

export const fetchSortByPopularity = createAsyncThunk(
  "posts/fetchSortByPopularity",
  async () => {
    await axios.get(`/posts`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //Articles
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading"; //loading
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded"; //request succeeded
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error"; //error
    },
    //Tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading"; //loading
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded"; //request succeeded
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error"; //error
    },
    //Delete articles
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      ); //delete article from arr
    },
    //new post sort
    [fetchSortByNewest.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchSortByNewest.fulfilled]: (state) => {
      state.posts.items = state.posts.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      state.posts.status = "loaded";
    },
    [fetchSortByNewest.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //popularity post sort
    [fetchSortByPopularity.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchSortByPopularity.fulfilled]: (state) => {
      state.posts.items = state.posts.items.sort(
        (a, b) => b.viewsCount - a.viewsCount
      );
      state.posts.status = "loaded";
    },
    [fetchSortByPopularity.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  }, // in extraReducer describe state asycn action
});

export const postsReducer = postsSlice.reducer;
