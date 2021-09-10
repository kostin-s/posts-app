import React from 'react'
import { useSelector } from 'react-redux'
import NotificationItem from '../NotificationItem/NotificationItem'

const Notifications = () => {
  const notifications = useSelector(
    (state) => state.notifications.notifications
  )

  return (
    <div className="notification">
      {notifications.map((item, i) => (
        <NotificationItem
          key={item.id}
          id={item.id}
          text={item.text}
          type={item.type}
        />
      ))}
    </div>
  )
}

export default Notifications
