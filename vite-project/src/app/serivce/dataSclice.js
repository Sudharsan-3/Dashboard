import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

const initialState = {
  posts: [],
  allPosts: [], // ✅ keep the original copy
  loading: false,
  error: null,
  // filter: null,
};

const dataSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const selected = action.payload;
    
      if (selected !== "All") {
        // ✅ Always filter from the original full dataset
        state.posts = state.allPosts.filter(
          (post) => Number(post.userId) === Number(selected)
        );
      } else {
        // ✅ Restore all posts
        state.posts = state.allPosts;
      }
    },
    
    setSeach: (state, action) => {
      state.posts = action.payload;
    },
    resetSearch: (state) => {
      state.posts = state.allPosts; // ✅ restore original posts
    },
    sorting : (state,action) =>{
      if(action.payload === "asc" ){
        
        state.posts = [...state.posts].sort((a,b)=> a.title.localeCompare(b.title))
      } else if (action.payload === "desc") {
        
        state.posts = [...state.posts].sort((a,b)=> b.title.localeCompare(a.title))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.allPosts = action.payload; // ✅ store original
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setFilter, setSeach, resetSearch , sorting } = dataSlice.actions;
export default dataSlice.reducer;
