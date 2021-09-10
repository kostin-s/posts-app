import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginImg from '../../assets/img/login.svg'
import { login } from '../../store/actions/user'
import FromAuth from '../../components/FormAuth/FromAuth'
import { createNotif } from '../../store/reducers/notificationReducer'
import { checkErrorForm } from '../../utils/checkErrorForm'

const Login = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const loginHandler = (event) => {
    event.preventDefault()
    const errors = checkErrorForm([
      { type: 'email', value: values.email },
      { type: 'password', value: values.password },
    ])
    if (errors.length > 0) {
      dispatch(createNotif({ text: errors[0], type: 'error' }))
    } else {
      dispatch(login(values.email, values.password))
    }
  }

  const inputData = [
    {
      icon: 'fa-envelope',
      type: 'text',
      placeholder: 'Логин',
      name: 'email',
      value: values.email,
      setValue: handleInput,
    },
    {
      icon: 'fa-lock',
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      value: values.password,
      setValue: handleInput,
    },
  ]

  return (
    <div className="authorization">
      <div className="authorization__enter">
        <FromAuth title={'Войти'} inputData={inputData}>
          <button
            className="btn btn__blue"
            onClick={(event) => loginHandler(event)}
          >
            Войти
          </button>
        </FromAuth>
        <div className="authorization__img">
          <img src={LoginImg} alt="login img" />
        </div>
      </div>
      <div className="link__registration">
        <Link className="btn btn__blue" to="/registration">
          Зарегистрироваться
        </Link>
        <h3 className="register__subtitle">Вы здесь в первый раз?</h3>
      </div>
    </div>
  )
}

export default Login
