import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import UserSlice from "../slices/UserSlice";
import PathSlice from "../slices/PathSlice";

const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
    path: PathSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
