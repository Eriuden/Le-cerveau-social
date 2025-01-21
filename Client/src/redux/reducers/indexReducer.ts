import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user.reducer";
import { allUsersReducer } from "./allUsers.reducer";
import { errorReducer } from "./error.reducer";
import { postReducer } from "./post.reducer";
import { allPostsReducer } from "./allPost.reducer";
import {trendingReducer} from "./trending.reducer";

export const reducers = combineReducers({
    userReducer,
    allUsersReducer,
    postReducer,
    allPostsReducer,
    errorReducer,
    trendingReducer
})