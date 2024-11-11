import { configureStore } from '@reduxjs/toolkit'
import { mantenimientoSlice } from './slices';

export const store = configureStore({
  reducer: {
    mantenimiento: mantenimientoSlice.reducer,
  },
})