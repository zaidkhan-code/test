import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  activeModal: null,
  selectedContact: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload.type;
      state.selectedContact = action.payload.contact || null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.selectedContact = null;
    },
  },
});

export const { toggleSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
