import axios from 'axios'
import { APP_URL } from '../../config'
import {
  setPosts,
  addPost,
  removePost,
  updatePost,
} from '../reducers/postsReducer'

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${APP_URL}/api/posts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    dispatch(setPosts(response.data))
  } catch (e) {
    alert(e?.response?.data?.message)
  }
}

export const createPosts =
  ({ title, content }) =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `${APP_URL}/api/posts/create`,
        {
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      dispatch(addPost(response.data))
    } catch (e) {
      alert(e?.response?.data?.message)
    }
  }

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`${APP_URL}/api/posts/remove?id=${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    dispatch(removePost(postId))
  } catch (e) {
    alert(e?.response?.data?.message)
  }
}

export const putPost = (post) => async (dispatch) => {
  try {
    const result = await axios.put(
      `${APP_URL}/api/posts/update`,
      { post },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
    if (result.data.upPost.modifiedCount) {
      dispatch(updatePost(post))
    }
  } catch (e) {
    alert(e?.response?.data?.message)
  }
}
