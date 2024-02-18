import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const filter = action.payload.filter
      return filter
    }
  }
})

export default filterSlice.reducer
export const { setFilter } = filterSlice.actions
