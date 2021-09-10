import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../../store/actions/user'
import Router from '../Router/Router'
import '../../styles/app.scss'
import Notifications from '../Notifications/Notifications'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <div className="main">
      <Router />
      <Notifications />
    </div>
  )
}

export default App
