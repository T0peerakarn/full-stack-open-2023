import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload.notification
      return notification
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export default notificationSlice.reducer
export const { setNotification, removeNotification } = notificationSlice.actions