import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPostsByTag = createAsyncThunk("tags/fetchPostsByTags", async (tag) => {
        const { data } = await axios.get(`/tags/${tag}`);
        return data;
    }
);

const postsByTagSlice = createSlice({
    name: "postsByTag",
    initialState: {
        postsByTag: {
            items: [],
            status: "loading",
        },
    },
    reducers: {},
    extraReducers: {
        [fetchPostsByTag.pending]: (state) => {
            state.postsByTag.status = "loading";
        },
        [fetchPostsByTag.fulfilled]: (state, action) => {
            state.postsByTag.items = action.payload;
            state.postsByTag.status = "loaded";
        },
        [fetchPostsByTag.rejected]: (state) => {
            state.postsByTag.items = [];
            state.postsByTag.status = "error";
        },
    },
});


export const postsByTagReducer = postsByTagSlice.reducer;