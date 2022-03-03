import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer from '../modules/notifications/notificationsSlice'
import postReducer from '../modules/posts/postsSlice'
import usersReducer from '../modules/users/usersSlice'

export default configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})
