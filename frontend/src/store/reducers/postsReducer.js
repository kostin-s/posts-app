const SET_POSTS = 'SET_POSTS'
const ADD_POST = 'ADD_POST'
const REMOVE_POST = 'REMOVE_POST'
const UPDATE_POST = 'UPDATE_POST'

const initialState = {
  posts: [],
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload }
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] }
    case UPDATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload._id
              ? { ...action.payload }
              : { ...post }
          ),
        ],
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.payload)],
      }
    default:
      return state
  }
}

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
})
export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
})
export const removePost = (postId) => ({
  type: REMOVE_POST,
  payload: postId,
})
export const updatePost = (post) => ({
  type: UPDATE_POST,
  payload: post,
})
