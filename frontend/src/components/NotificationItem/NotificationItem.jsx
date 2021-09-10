import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deleteNotif } from '../../store/reducers/notificationReducer'

const NotificationItem = ({ id, text, type }) => {
  const dispatch = useDispatch()
  const [hideItem, setHideItem] = useState(false)

  const deleteNotification = () => {
    setTimeout(() => {
      setHideItem(true)
      setTimeout(() => {
        dispatch(deleteNotif(id))
      }, 400)
    }, 5000)
  }

  useEffect(() => {
    deleteNotification()
  }, [])

  return (
    <div
      className={`notification__item ${
        type?.toLowerCase() === 'ok'
          ? 'notification__ok'
          : 'notification__error'
      } ${hideItem ? 'hide' : ''}`}
    >
      <p className="notification__message">{text}</p>
    </div>
  )
}

export default NotificationItem
