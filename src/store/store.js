import { configureStore } from '@reduxjs/toolkit'
import { mantenimientoSlice } from './slices';
import { authSlice } from './auth';

export const store = configureStore({
  reducer: {
    mantenimiento: mantenimientoSlice.reducer,
    auth: authSlice.reducer,
  },
})