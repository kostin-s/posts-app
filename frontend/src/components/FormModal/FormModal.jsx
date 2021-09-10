import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createNotif } from '../../store/reducers/notificationReducer'

const FormModal = ({ titleFrom, setVisible, actionForm, data }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ title: '', text: '' })

  useEffect(() => {
    if (data) setFormData({ title: data.title, text: data.content })
  }, [data])

  const handleForm = (event) => {
    event.preventDefault()
    const checkField =
      formData.title.trim() !== '' &&
      formData.text.trim() !== '' &&
      (data
        ? formData.title !== data.title || formData.text !== data.content
        : true)
        ? true
        : false
    if (checkField) {
      let post
      if (data)
        post = { ...data, title: formData.title, content: formData.text }
      else post = { title: formData.title, content: formData.text }
      dispatch(actionForm(post))
      setVisible(false)
    } else
      dispatch(
        createNotif({
          text: 'Поля формы не заполнены или не изменены',
          type: 'error',
        })
      )
  }

  return (
    <form className="form">
      <h3>{titleFrom}</h3>
      <input
        className="form__title"
        type="text"
        maxLength="50"
        placeholder="Заголовок поста"
        value={formData.title}
        onChange={(event) =>
          setFormData({ ...formData, title: event.target.value })
        }
      />
      <textarea
        className="form__text"
        cols="30"
        rows="10"
        maxLength="2000"
        placeholder="Текст поста"
        value={formData.text}
        onChange={(event) =>
          setFormData({ ...formData, text: event.target.value })
        }
      />
      <button className="btn btn__green" onClick={(event) => handleForm(event)}>
        Сохранить
      </button>
    </form>
  )
}

export default FormModal
