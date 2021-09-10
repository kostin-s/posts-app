import axios from 'axios'
import { APP_URL } from '../../config'
import { setUser } from '../reducers/userReducer'
import { createNotif } from '../reducers/notificationReducer'

export const registration = async (email, password, name, surname) => {
  try {
    const registration = await axios.post(`${APP_URL}/api/user/registration`, {
      email,
      password,
      name,
      surname,
    })
    return registration
  } catch (e) {
    return e?.response?.data?.message
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post(`${APP_URL}/api/user/login`, {
      email,
      password,
    })
    dispatch(setUser(res.data.user))
    localStorage.setItem('token', res.data.token)
  } catch (e) {
    dispatch(
      createNotif({
        text: e?.response?.data?.message || 'ошибка',
        type: 'error',
      })
    )
  }
}

export const auth = () => async (dispatch) => {
  try {
    const res = await axios.get(`${APP_URL}/api/user/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    dispatch(setUser(res.data.user))
    localStorage.setItem('token', res.data.token)
  } catch (e) {
    localStorage.removeItem('token')
  }
}
