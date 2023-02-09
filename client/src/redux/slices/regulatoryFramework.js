import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchRegulatoryFramework = createAsyncThunk("regulatory_framework/fetchRegulatoryFramework", async () => {
    const { data } = await axios.get("/regulatory_framework");
    return data;
});

export const fetchRemoveRegulatoryFramework = createAsyncThunk(
    "regulatory_framework/fetchRemoveRegulatoryFramework",
    (id) => {
        axios.delete(`/regulatory_framework/${id}`);
    }
);


const rfSlice = createSlice({
    name: "rf",
    initialState: {
        rf: {
            items: [],
            status: "loading",
        },
    },
    reducers: {},
    extraReducers: {
        [fetchRegulatoryFramework.pending]: (state) => {
            state.rf.status = "loading";
        },
        [fetchRegulatoryFramework.fulfilled]: (state, action) => {
            state.rf.items = action.payload;
            state.rf.status = "loaded";
        },
        [fetchRegulatoryFramework.rejected]: (state) => {
            state.rf.items = [];
            state.rf.status = "error";
        },

        [fetchRemoveRegulatoryFramework.pending]: (state, action) => {
            state.rf.items = state.rf.items.filter(
                (obj) => obj._id !== action.meta.arg
            );
        },
    },
});


export const rfReducer = rfSlice.reducer;