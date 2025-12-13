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
      className="border-b border-custom hover:bg-hover transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
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
            <div className="mt-1 text-primary whitespace-pre-wrap break-words">
              {processTweetContent(tweet.content)}
            </div>

            {/* Tweet Actions */}
            <div className="mt-4 flex items-center justify-between max-w-md">
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

              <IconButton
                icon={<Bookmark filled={isBookmarked} size="20" />}
                label="Bookmark"
                isActive={isBookmarked}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmark();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}