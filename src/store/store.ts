import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './task/tasksSlice'
import themeReducer from './theme/themeSlice'
import dialogReducer from './dialog/dialogSlice'

//creating the store and exporting it
export const store = configureStore({
  reducer: {
    tasksSlice: tasksReducer,
    themeSlice: themeReducer,
    dialogSlice: dialogReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch