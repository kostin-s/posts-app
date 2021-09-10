import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import RegisterImg from '../../assets/img/register.svg'
import FromAuth from '../../components/FormAuth/FromAuth'
import { registration } from '../../store/actions/user.js'
import { createNotif } from '../../store/reducers/notificationReducer'
import { checkErrorForm } from '../../utils/checkErrorForm'

const Register = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
  })

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
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
    {
      icon: 'fa-user',
      type: 'text',
      placeholder: 'Имя',
      name: 'name',
      value: values.name,
      setValue: handleInput,
    },
    {
      icon: 'fa-user-tie',
      type: 'text',
      placeholder: 'Фамилия',
      name: 'surname',
      value: values.surname,
      setValue: handleInput,
    },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = checkErrorForm([
      { type: 'email', value: values.email },
      { type: 'password', value: values.password },
      { type: 'field', value: values.name },
      { type: 'field', value: values.surname },
    ])
    if (errors.length > 0) {
      dispatch(createNotif({ text: errors[0], type: 'error' }))
    } else {
      const data = await registration(
        values.email,
        values.password,
        values.name,
        values.surname
      )
      dispatch(createNotif({ text: data.data || data, type: data.statusText }))
      if (data.statusText) {
        setValues({ email: '', password: '', name: '', surname: '' })
      }
    }
  }

  return (
    <div className="authorization">
      <div className="authorization__enter">
        <div className="authorization__img">
          <img src={RegisterImg} alt="authorization img" />
        </div>
        <FromAuth title={'Регистрация'} inputData={inputData}>
          <button
            className="btn btn__blue"
            type="submit"
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </button>
        </FromAuth>
      </div>
      <div className="link__registration">
        <Link className="btn btn__blue" to="/login">
          Войти
        </Link>
        <h3 className="register__subtitle">Уже зарегистрированы?</h3>
      </div>
    </div>
  )
}

export default Register
