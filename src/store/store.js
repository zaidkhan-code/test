import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contactsReducer from './slices/contactsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    ui: uiReducer,
  },
});
