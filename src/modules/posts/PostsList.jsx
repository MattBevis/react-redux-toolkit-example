import React, { useEffect } from 'react'
import { Spinner } from '../../components/Spinner'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import {
  fetchPosts,
  // selectAllPosts,
  selectPostIds,
  selectPostsById,
} from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostsById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

function PostsList() {
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  // const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const orderedPostIds = useSelector(selectPostIds)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <Spinner text="loading" />
  } else if (postStatus === 'succeeded') {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
