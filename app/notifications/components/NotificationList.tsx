'use client';

import { mockNotifications } from '../../home/data/mockData';
import NotificationItem from './NotificationItem';

export default function NotificationList() {
  return (
    <div>
      {mockNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}