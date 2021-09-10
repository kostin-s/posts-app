import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, putPost } from '../../store/actions/posts'
import Modal from '../Modal/Modal'
import FormModal from '../FormModal/FormModal'

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const [currentPost, setCurrentPost] = useState({})

  const changePost = (post) => {
    setCurrentPost(post)
    setModal(true)
  }

  return (
    <section className="post">
      <ul className="post__list">
        {posts.map((post) => (
          <li className="post__item" key={post._id}>
            <div className="post__content">
              <h4 className="post__title">{post.title}</h4>
              <p className="post__text">{post.content}</p>
            </div>
            <div className="post__btn">
              <button
                className="btn btn__yellow"
                onClick={() => changePost(post)}
              >
                Изменить
              </button>
              <button
                className="btn btn__red"
                onClick={() => dispatch(deletePost(post._id))}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!posts.length && <p className="post__no">Постов нет.</p>}
      {modal && (
        <Modal visible={modal} setVisible={setModal}>
          <FormModal
            titleForm={'Окно изменения поста'}
            setVisible={setModal}
            actionForm={putPost}
            data={currentPost}
          />
        </Modal>
      )}
    </section>
  )
}

export default Posts
