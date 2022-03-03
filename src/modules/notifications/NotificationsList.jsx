import classNames from 'classnames'
import { formatDistanceToNow, parseISO } from 'date-fns'
import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'

export default function NotificationsList() {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    const notificationClassName = classNames('notification', {
      new: notification.isNew,
    })

    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
