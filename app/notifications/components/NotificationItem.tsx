'use client';

import UserAvatar from '../../home/components/ui/UserAvatar';
import { Button } from '../../home/components/ui/button';

interface NotificationItemProps {
  notification: any;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'like':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-pink-500">
            <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.362-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.548-.06 3.063.58 3.968 1.81.905-1.23 2.42-1.87 3.968-1.81 1.954.1 3.714 1.22 4.601 3.01.896 1.81.848 4.17-.514 6.67z"/>
          </svg>
        );
      case 'repost':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-green-500">
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L-1.265 9.48l-1.364-1.46L4.5 3.88z M18.5 8v8.45l2.765-1.93 1.364 1.46L18.5 20.12l-4.432-4.14 1.364-1.46 2.765 1.93V8c0-1.1-.896-2-2-2H11V4h5.5c2.209 0 4 1.79 4 4z"/>
          </svg>
        );
      case 'follow':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-blue">
            <path d="M17.862 13.639c-1.438 1.627-3.483 2.732-5.762 3.091a11.089 11.089 0 01-7.862-3.091l1.415-1.414a9.035 9.035 0 006.447 2.696c2.481 0 4.729-1.087 6.447-2.696l1.415 1.414zM7 7c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm3-1c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1zm5.449 1.298c-.443.416-.948.763-1.498 1.023V11h3v2h-3v3h-2v-3h-3v-2h3V8.321a5.974 5.974 0 01-1.498-1.023L7.5 7.438A7.983 7.983 0 0112 6a7.983 7.983 0 014.5 1.438l-.851.86z"/>
          </svg>
        );
      case 'mention':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-blue">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
          </svg>
        );
      case 'reply':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-blue">
            <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067C4.902 17.87 1.751 14.24 1.751 10zm16.998 6.22c2.014-1.066 3.418-3.183 3.418-5.61 0-3.516-2.859-6.377-6.379-6.377H9.756c-3.484 0-6.318 2.833-6.318 6.32 0 3.395 2.67 6.18 6.049 6.354l.33.02h.743v2.424l5.47-3.03z"/>
          </svg>
        );
      case 'quote':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-blue">
            <path d="M14.042 18.567c-1.197 0-2.333-.387-3.258-1.09-.864-.755-1.411-1.8-1.411-2.954 0-1.157.547-2.199 1.411-2.954.925-.703 2.061-1.09 3.258-1.09 1.197 0 2.333.387 3.258 1.09.864.755 1.411 1.8 1.411 2.954 0 1.154-.547 2.199-1.411 2.954-.925.703-2.061 1.09-3.258 1.09zm0-1.5c1.39 0 2.5-1.119 2.5-2.5 0-1.381-1.11-2.5-2.5-2.5s-2.5 1.119-2.5 2.5c0 1.381 1.11 2.5 2.5 2.5zM5.958 18.567c-1.197 0-2.333-.387-3.258-1.09-.864-.755-1.411-1.8-1.411-2.954 0-1.157.547-2.199 1.411-2.954.925-.703 2.061-1.09 3.258-1.09 1.197 0 2.333.387 3.258 1.09.864.755 1.411 1.8 1.411 2.954 0 1.154-.547 2.199-1.411 2.954-.925.703-2.061 1.09-3.258 1.09zm0-1.5c1.39 0 2.5-1.119 2.5-2.5 0-1.381-1.11-2.5-2.5-2.5s-2.5 1.119-2.5 2.5c0 1.381 1.11 2.5 2.5 2.5z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-secondary">
            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"/>
          </svg>
        );
    }
  };

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
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
            {getNotificationIcon()}
          </div>

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
                  {notification.user.verified && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-blue fill-current">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </svg>
                  )}
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