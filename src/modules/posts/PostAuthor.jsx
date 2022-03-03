import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

function PostAuthor() {
  const author = useSelector((state) => selectUserById(state))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
