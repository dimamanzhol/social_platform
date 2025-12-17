'use client';

import { Tweet } from '../../../types';
import { useState } from 'react';

interface PostCardProps {
  tweet: Tweet;
  isReply?: boolean;
  onClick?: () => void;
}

export default function PostCard({ tweet, isReply = false, onClick }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(tweet.likedByCurrentUser);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    console.log('Comment clicked');
  };

  const handleShare = () => {
    console.log('Share clicked');
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
    return content
      .split(' ')
      .map((word, index) => {
        if (word.startsWith('@')) {
          return (
            <span key={index} className="text-link hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        } else if (word.startsWith('#')) {
          return (
            <span key={index} className="text-link hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        } else if (word.startsWith('http')) {
          return (
            <span key={index} className="text-link hover:underline cursor-pointer">
              {word}{' '}
            </span>
          );
        }
        return word + ' ';
      });
  };

  return (
    <article
      className="w-full bg-card rounded-xl mb-4 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
      style={{
        boxShadow: 'var(--shadow-md)',
        marginBottom: '16px'
      }}
      onClick={onClick}
    >
      <div className="p-4">
        {/* Post Header */}
        <div className="flex items-center mb-3" style={{ minHeight: '48px', gap: '12px' }}>
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={tweet.author.avatar}
              alt={tweet.author.displayName}
              className="w-12 h-12 rounded-full object-cover"
              style={{ width: '48px', height: '48px' }}
            />
          </div>

          {/* User Info Container */}
          <div className="flex-1 flex flex-col" style={{ gap: '2px' }}>
            {/* Username */}
            <div className="flex items-center gap-1">
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1A1A1A',
                  lineHeight: '20px'
                }}
              >
                {tweet.author.displayName}
              </span>
              {tweet.author.verified && (
                <svg className="w-4 h-4" style={{ color: 'var(--primary)' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                </svg>
              )}
            </div>

            {/* Handle & Time Row */}
            <div className="flex items-center" style={{ gap: '8px' }}>
              <span className="text-secondary" style={{ fontSize: '13px', fontWeight: '400' }}>
                @{tweet.author.username}
              </span>
              <span className="text-secondary" style={{ fontSize: '13px' }}>·</span>
              <div className="flex items-center" style={{ gap: '4px' }}>
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)', width: '12px', height: '12px' }}>
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-secondary" style={{ fontSize: '13px', fontWeight: '400' }}>
                  {formatRelativeTime(tweet.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Three Dots Menu */}
          <button
            className="p-1 rounded-full hover:bg-hover transition-colors"
            style={{ width: '24px', height: '24px', padding: '4px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', color: 'var(--text-secondary)' }}>
              <circle cx="5" cy="12" r="1.5"/>
              <circle cx="12" cy="12" r="1.5"/>
              <circle cx="19" cy="12" r="1.5"/>
            </svg>
          </button>
        </div>

        {/* Post Content */}
        <div style={{ marginTop: '12px', marginBottom: '12px' }}>
          <div
            className="whitespace-pre-wrap break-words text-primary"
            style={{
              fontSize: '15px',
              fontWeight: '400',
              lineHeight: '1.5'
            }}
          >
            {processTweetContent(tweet.content)}
          </div>
        </div>

        {/* Media Content */}
        {tweet.media && tweet.media.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            {tweet.media.map((media) => (
              <div key={media.id} className="rounded-lg overflow-hidden">
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.altText}
                    className="w-full h-auto"
                    style={{ maxHeight: '400px', objectFit: 'cover', aspectRatio: '4/3' }}
                  />
                ) : (
                  <video
                    src={media.url}
                    className="w-full rounded-lg"
                    controls
                    style={{ maxHeight: '400px', aspectRatio: '4/3' }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Post Footer */}
        <div
          className="flex items-center justify-between"
          style={{
            height: '40px',
            marginTop: '12px',
            paddingTop: '12px'
          }}
        >
          {/* Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
              isLiked
                ? 'text-primary hover:bg-primary-light'
                : 'text-secondary hover:bg-hover'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: '20px', height: '20px' }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {isLiked ? tweet.likesCount + 1 : tweet.likesCount}
            </span>
          </button>

          {/* Comment Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComment();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-secondary hover:bg-hover transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {tweet.repliesCount}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-secondary hover:bg-hover transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              Share
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}