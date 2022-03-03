import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

export default function User({ match }) {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postTiles = postsForUser.map((post) => (
    <li>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.firstName}</h2>
      <ul>{postTiles}</ul>
    </section>
  )
}
