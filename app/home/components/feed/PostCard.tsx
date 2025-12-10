'use client';

import { Tweet } from '../../types';
import UserAvatar from '../ui/UserAvatar';
import IconButton from '../ui/IconButton';
import { useState } from 'react';

interface PostCardProps {
  tweet: Tweet;
  isReply?: boolean;
}

export default function PostCard({ tweet, isReply = false }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(tweet.likedByCurrentUser);
  const [isReposted, setIsReposted] = useState(tweet.repostedByCurrentUser);
  const [isBookmarked, setIsBookmarked] = useState(tweet.bookmarkedByCurrentUser);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
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

  const processTweetContent = (content: string) => {
    // Process mentions, hashtags, and URLs
    return content
      .split(' ')
      .map((word, index) => {
        if (word.startsWith('@')) {
          return (
            <span key={index} className="text-accent-blue hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        } else if (word.startsWith('#')) {
          return (
            <span key={index} className="text-accent-blue hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        } else if (word.startsWith('http')) {
          return (
            <span key={index} className="text-accent-blue hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        }
        return word + ' ';
      });
  };

  const currentLikes = isLiked ? tweet.likesCount + 1 : tweet.likesCount;
  const currentReposts = isReposted ? tweet.repostsCount + 1 : tweet.repostsCount;

  return (
    <article className="border-b border-custom hover:bg-hover transition-colors duration-200">
      <div className="p-4">
        <div className="flex space-x-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <UserAvatar
              src={tweet.author.avatar}
              alt={tweet.author.displayName}
            />
          </div>

          {/* Tweet Content */}
          <div className="flex-1 min-w-0">
            {/* Tweet Header */}
            <div className="flex items-center space-x-1">
              <span className="font-bold text-primary hover:underline cursor-pointer">
                {tweet.author.displayName}
              </span>
              {tweet.author.verified && (
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-blue fill-current">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                </svg>
              )}
              <span className="text-secondary">
                @{tweet.username} · {formatRelativeTime(tweet.createdAt)}
              </span>
              {tweet.replyToUser && (
                <span className="text-secondary">
                  {' '} replying to @{tweet.replyToUser.username}
                </span>
              )}
            </div>

            {/* Tweet Content */}
            <div className="mt-1 text-primary whitespace-pre-wrap break-words">
              {processTweetContent(tweet.content)}
            </div>

            {/* Tweet Actions */}
            <div className="mt-4 flex items-center justify-between max-w-md">
              <IconButton
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067C4.902 17.87 1.751 14.24 1.751 10zm16.998 6.22c2.014-1.066 3.418-3.183 3.418-5.61 0-3.516-2.859-6.377-6.379-6.377H9.756c-3.484 0-6.318 2.833-6.318 6.32 0 3.395 2.67 6.18 6.049 6.354l.33.02h.743v2.424l5.47-3.03z"/>
                  </svg>
                }
                label="Reply"
                count={tweet.repliesCount}
                onClick={() => {}}
              />

              <IconButton
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L-1.265 9.48l-1.364-1.46L4.5 3.88z M18.5 8v8.45l2.765-1.93 1.364 1.46L18.5 20.12l-4.432-4.14 1.364-1.46 2.765 1.93V8c0-1.1-.896-2-2-2H11V4h5.5c2.209 0 4 1.79 4 4z"/>
                  </svg>
                }
                label="Repost"
                count={currentReposts}
                isActive={isReposted}
                onClick={handleRepost}
              />

              <IconButton
                icon={
                  isLiked ? (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.362-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.548-.06 3.063.58 3.968 1.81.905-1.23 2.42-1.87 3.968-1.81 1.954.1 3.714 1.22 4.601 3.01.896 1.81.848 4.17-.514 6.67z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.378-2.55-7.028-5.19-8.382-7.67-1.362-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.548-.06 3.063.58 3.968 1.81.905-1.23 2.42-1.87 3.968-1.81 1.954.1 3.714 1.22 4.601 3.01.896 1.81.848 4.17-.514 6.67zM12 20.15c3.6-2.1 5.9-4.32 7.05-6.22.93-1.7.97-3.2.31-4.52-.6-1.22-1.83-2.01-3.18-2.08-1.1-.04-2.16.42-2.86 1.21l-.8.9-.8-.9c-.7-.79-1.76-1.25-2.86-1.21-1.35.07-2.58.86-3.18 2.08-.66 1.32-.62 2.82.31 4.52C6.1 15.83 8.4 18.05 12 20.15z"/>
                    </svg>
                  )
                }
                label="Like"
                count={currentLikes}
                isActive={isLiked}
                onClick={handleLike}
              />

              <IconButton
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M18.5 10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5h1.5v5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V8.38l-1.647 1.53-1.706-1.82 4.603-4.3c.38-.36.87-.56 1.38-.56s1 .2 1.38.57l5.57 5.21c.58.54.84 1.33.66 2.09l-1.34 5.34c-.19.75-.73 1.33-1.46 1.56l-4.87 1.54c-.27.08-.55.12-.83.12-.59 0-1.16-.19-1.62-.54l-3.3-2.49c-.58-.44-.92-1.13-.92-1.86V7.5c0-.69.32-1.32.82-1.72L3.61 3.79z"/>
                  </svg>
                }
                label="Share"
                onClick={() => {}}
              />

              <IconButton
                icon={
                  isBookmarked ? (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"/>
                    </svg>
                  )
                }
                label="Bookmark"
                isActive={isBookmarked}
                onClick={handleBookmark}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}