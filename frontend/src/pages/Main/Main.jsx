import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../store/actions/posts'
import Posts from '../../components/Posts/Posts'
import Header from '../../components/Header/Header'

const MainPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <div className="main-page">
      <Header />
      <Posts />
    </div>
  )
}

export default MainPage
