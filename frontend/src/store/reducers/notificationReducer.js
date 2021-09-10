import { v4 } from 'uuid'
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

const initialState = {
  notifications: [],
}

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: v4(), ...action.payload },
        ],
      }
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications.filter((item) => item.id !== action.payload),
        ],
      }
    default:
      return state
  }
}

export const createNotif = (item) => ({
  type: CREATE_NOTIFICATION,
  payload: item,
})

export const deleteNotif = (id) => ({
  type: DELETE_NOTIFICATION,
  payload: id,
})
