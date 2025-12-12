'use client';

import UserAvatar from '../../home/components/ui/UserAvatar';
import { Button } from '../../home/components/ui/button';

interface NotificationItemProps {
  notification: any;
}

export default function NotificationItem({ notification }: NotificationItemProps) {

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes <= 1 ? 'now' : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleFollowBack = () => {
    console.log('Follow back:', notification.user.username);
    // TODO: Implement follow back functionality
  };

  return (
    <div className={`border-b border-custom hover:bg-hover transition-colors duration-200 ${
      !notification.isRead ? 'bg-primary bg-opacity-50' : ''
    }`}>
      <div className="p-4">
        <div className="flex space-x-3">
  
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-3">
              {/* User Avatar */}
              <UserAvatar
                src={notification.user.avatar}
                alt={notification.user.displayName}
                size="md"
              />

              {/* Notification Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-primary hover:underline cursor-pointer">
                    {notification.user.displayName}
                  </span>
                    <span className="text-secondary">
                    {notification.text}
                  </span>
                </div>

                {/* Tweet preview (for like, repost, mention, reply, quote) */}
                {notification.tweet && (
                  <div className="mt-2 p-3 bg-secondary rounded-2xl">
                    <p className="text-primary text-sm leading-normal">
                      {notification.tweet.content}
                    </p>
                  </div>
                )}

                {/* Timestamp and Follow button (for follow notifications) */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-secondary text-sm">
                    {formatRelativeTime(notification.timestamp)}
                  </span>

                  {notification.type === 'follow' && (
                    <Button className="bg-primary hover:bg-hover text-primary border border-custom px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:border-accent-blue hover:text-accent-blue">
                      Follow back
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}