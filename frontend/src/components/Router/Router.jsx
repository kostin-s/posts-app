import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import Main from '../../pages/Main/Main'

const Router = () => {
  const isAuth = useSelector((state) => state.user.isAuth)

  return (
    <>
      {!isAuth ? (
        <Switch>
          <Route path={'/login'} component={Login} exact />
          <Route path={'/registration'} component={Register} exact />
          <Redirect from="/" to="/login" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Main} exact />
          <Redirect to="/" />
        </Switch>
      )}
    </>
  )
}

export default Router
