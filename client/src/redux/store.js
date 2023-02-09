import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { rfReducer } from "./slices/regulatoryFramework";
import {tagsReducer} from "./slices/tags";
import {postsByTagReducer} from "./slices/postsByTag";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
    postsByTag: postsByTagReducer,
    rf: rfReducer,
    auth: authReducer,
  },
});

export default store;