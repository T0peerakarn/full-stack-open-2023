import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, action) {
      const notification = action.payload.notification
      return notification
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export default notificationSlice.reducer
export const { updateNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, duration) => {
  return dispatch => {
    dispatch(updateNotification({ notification }))
    setTimeout(() => dispatch(removeNotification()), duration * 1000)
  }
}