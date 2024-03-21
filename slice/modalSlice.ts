import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  modal: boolean;
}

// 타입스크립트가 필요 이상으로 초기 상태의 유형을 타이트하게 하는 것을 방지
const initialState: ModalState = {
  modal: false,
} satisfies ModalState as ModalState;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

export const { showModal } = modalSlice.actions;

export default modalSlice.reducer;
