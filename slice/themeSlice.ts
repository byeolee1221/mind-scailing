import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: string;
}

// 타입스크립트가 필요 이상으로 초기 상태의 유형을 타이트하게 하는 것을 방지
const initialState: ThemeState = {
  theme: "light",
} satisfies ThemeState as ThemeState;

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeDark: (state) => {
      state.theme = "dark";
    },
    themeLight: (state) => {
      state.theme = "light";
    },
  },
});

export const { themeDark, themeLight } = themeSlice.actions;

export default themeSlice.reducer;
