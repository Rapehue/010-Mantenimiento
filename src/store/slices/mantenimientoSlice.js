import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   value: 0,
//   activeTask: [],
//   activeDelivery: [],
//   isSelected: false,
// }

export const mantenimientoSlice = createSlice({
  name: 'mantenimiento',
  initialState: {
    activeTask: '',
    activeDelivery: '',
    value: 0,
    textButton: '',
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setActiveDelivery: (state, { payload }) => {
      state.activeDelivery = payload;
    },
    setValue: (state, { payload }) => {
      state.value = payload;
    },
    setActiveTask: (state, { payload }) => {
      state.activeTask = payload;
    },
    setTextButton: (state, { payload }) => {
      state.textButton = payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setActiveTask, setActiveDelivery, setValue, setTextButton } = mantenimientoSlice.actions

// export default mantenimientoSlice.reducer