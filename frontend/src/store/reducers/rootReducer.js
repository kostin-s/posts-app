import { combineReducers } from 'redux'
import { notificationReducer } from './notificationReducer'
import { postsReducer } from './postsReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  notifications: notificationReducer,
})
