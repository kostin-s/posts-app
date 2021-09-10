import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createPosts } from '../../store/actions/posts'
import { logout } from '../../store/reducers/userReducer'
import FormModal from '../FormModal/FormModal'
import Modal from '../Modal/Modal'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const [modal, setModal] = useState(false)

  return (
    <header className="header">
      <div className="header__user">
        Добро пожаловать{' '}
        <span className="header__name">
          {user.surname} {user.name}
        </span>
      </div>
      <div className="header__btn">
        <button
          className="btn btn__green"
          onClick={() => {
            setModal(true)
          }}
        >
          Добавить
        </button>
        <button
          className="btn btn__red"
          onClick={() => {
            dispatch(logout())
          }}
        >
          Выход
        </button>
      </div>
      {modal && (
        <Modal visible={modal} setVisible={setModal}>
          <FormModal
            title={'Окно добавления поста'}
            setVisible={setModal}
            actionForm={createPosts}
          />
        </Modal>
      )}
    </header>
  )
}

export default Header
