import themeSlice from "@/slice/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
