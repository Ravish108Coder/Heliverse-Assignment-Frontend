import { configureStore } from "@reduxjs/toolkit";
// import todosReducer from "./todos/todoSlice";
import teamSlice from "./team/teamSlice";

export const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        team: teamSlice,
    },
    });