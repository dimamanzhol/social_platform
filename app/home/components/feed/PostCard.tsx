'use client';

import { Tweet } from '../../../types';
import UserAvatar from '../ui/UserAvatar';
import IconButton from '../ui/IconButton';
import { Comment, Repost, Like, Share, Bookmark } from '../ui/TweetIcons';
import { useState } from 'react';

interface PostCardProps {
  tweet: Tweet;
  isReply?: boolean;
  onClick?: () => void;
}

export default function PostCard({ tweet, isReply = false, onClick }: PostCardProps) {
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
    <article
      className="border-b border-custom hover:bg-hover transition-colors duration-200 cursor-pointer px-4 py-3"
      onClick={onClick}
    >
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
              <svg className="w-4 h-4 text-accent-blue" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.21 0-.42-.088-.59-.257-.344-.345-.344-.905 0-1.25l3.667-3.667-1.667-1.667c-.344-.345-.344-.905 0-1.25s.905-.345 1.25 0l2.334 2.333c.344.345.344.905 0 1.25z"/>
              </svg>
            )}
            <span className="text-secondary">
              @{tweet.author.username} · {formatRelativeTime(tweet.createdAt)}
            </span>
            {tweet.replyToUser && (
              <span className="text-secondary">
                {' '} replying to @{tweet.replyToUser.username}
              </span>
            )}
          </div>

          {/* Tweet Content */}
          <div className="mt-1 text-primary whitespace-pre-wrap break-words leading-relaxed">
            {processTweetContent(tweet.content)}
          </div>

          {/* Tweet Actions */}
          <div className="mt-4 flex items-center justify-between max-w-lg">
            <IconButton
              icon={<Comment size="20" />}
              label="Reply"
              count={tweet.repliesCount}
              onClick={(e) => e.stopPropagation()}
            />

            <IconButton
              icon={<Repost size="20" />}
              label="Repost"
              count={currentReposts}
              isActive={isReposted}
              onClick={(e) => {
                e.stopPropagation();
                handleRepost();
              }}
            />

            <IconButton
              icon={<Like filled={isLiked} size="20" />}
              label="Like"
              count={currentLikes}
              isActive={isLiked}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            />

            <div className="flex items-center space-x-1 text-secondary hover:text-accent-blue transition-colors cursor-pointer">
              <Share size="20" />
              <span className="text-xs">13.5K</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}