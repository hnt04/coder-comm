import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";
import friendReducer from "../features/friend/friendSlice";

const rootReducer = {
    comment: commentReducer,
    friend: friendReducer,
    post: postReducer,
    user: userReducer,
    // chosenId: chosenIdReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;

