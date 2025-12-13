'use client';

import { useState } from 'react';
import { Tweet } from '../../../types';
import UserAvatar from '../ui/UserAvatar';
import { Comment, Repost, Like, Bookmark, Share } from '../ui/TweetIcons';

interface PostCardProps {
  post: Tweet;
  onComment?: () => void;
  onAddComment?: (content: string) => void;
  onLike?: () => void;
  onRepost?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  currentUser?: {
    id: string;
    avatar: string;
    displayName: string;
  };
}

export default function PostCard({
  post,
  onComment,
  onAddComment,
  onLike,
  onRepost,
  onBookmark,
  onShare,
  currentUser
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.likedByCurrentUser);
  const [isReposted, setIsReposted] = useState(post.repostedByCurrentUser);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarkedByCurrentUser);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike();
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    if (onRepost) onRepost();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark();
  };

  const handleShare = () => {
    if (onShare) onShare();
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
    if (onComment) onComment();
  };

  const handleSubmitComment = () => {
    if (commentText.trim() && onAddComment) {
      onAddComment(commentText.trim());
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const processTweetContent = (content: string) => {
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

  const currentLikes = isLiked ? post.likesCount + 1 : post.likesCount;
  const currentReposts = isReposted ? post.repostsCount + 1 : post.repostsCount;

  return (
    <article className="border border-custom rounded-2xl bg-primary hover:bg-hover transition-all duration-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <UserAvatar
              src={post.author.avatar}
              alt={post.author.displayName}
              size="medium"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-primary hover:underline cursor-pointer">
                {post.author.displayName}
              </span>
              {post.author.verified && (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-accent-blue" aria-label="Verified account">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                </svg>
              )}
              <span className="text-sm text-secondary">
                @{post.author.username} · {formatRelativeTime(post.createdAt)} · {post.source}
              </span>
            </div>

            {/* Post Content */}
            <div className="mt-2 text-primary whitespace-pre-wrap break-words leading-relaxed">
              {processTweetContent(post.content)}
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Stats Bar */}
      <div className="px-4 py-2 border-t border-b border-custom">
        <div className="flex items-center justify-between text-sm text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-primary">{formatNumber(post.viewsCount)}</span>
              <span>Views</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-primary">{post.repliesCount}</span>
              <span>Replies</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-primary">{formatNumber(currentReposts)}</span>
              <span>Reposts</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs">
              🔥 Trending
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-lg">
          <button
            onClick={handleComment}
            className="flex items-center space-x-2 text-secondary hover:text-accent-blue transition-colors duration-200 group"
          >
            <div className="p-2 rounded-full group-hover:bg-accent-blue/10 transition-colors duration-200">
              <Comment size="20" />
            </div>
            <span className="text-sm font-medium">{post.repliesCount}</span>
          </button>

          <button
            onClick={handleRepost}
            className={`flex items-center space-x-2 transition-colors duration-200 group ${
              isReposted ? 'text-green-500' : 'text-secondary hover:text-green-500'
            }`}
          >
            <div className={`p-2 rounded-full transition-colors duration-200 ${
              isReposted ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'
            }`}>
              <Repost size="20" />
            </div>
            <span className="text-sm font-medium">{formatNumber(currentReposts)}</span>
          </button>

          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors duration-200 group ${
              isLiked ? 'text-red-500' : 'text-secondary hover:text-red-500'
            }`}
          >
            <div className={`p-2 rounded-full transition-colors duration-200 ${
              isLiked ? 'bg-red-500/10' : 'group-hover:bg-red-500/10'
            }`}>
              <Like filled={isLiked} size="20" />
            </div>
            <span className="text-sm font-medium">{formatNumber(currentLikes)}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-secondary hover:text-accent-blue transition-colors duration-200 group"
          >
            <div className="p-2 rounded-full group-hover:bg-accent-blue/10 transition-colors duration-200">
              <Share size="20" />
            </div>
          </button>

          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-2 transition-colors duration-200 group ${
              isBookmarked ? 'text-accent-blue' : 'text-secondary hover:text-accent-blue'
            }`}
          >
            <div className={`p-2 rounded-full transition-colors duration-200 ${
              isBookmarked ? 'bg-accent-blue/10' : 'group-hover:bg-accent-blue/10'
            }`}>
              <Bookmark filled={isBookmarked} size="20" />
            </div>
          </button>
        </div>
      </div>

      {/* Comment Input Section - Only shows when comment button is clicked */}
      {showCommentInput && currentUser && (
        <div className="px-4 pb-4 border-t border-custom">
          <div className="flex space-x-3 pt-3">
            <div className="flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Post your reply"
                className="w-full px-3 py-2 bg-secondary border border-custom rounded-lg text-primary placeholder:text-secondary resize-none focus:outline-none focus:border-accent-blue transition-colors duration-200"
                rows={3}
                autoFocus
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-secondary">{280 - commentText.length} characters left</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setShowCommentInput(false);
                      setCommentText('');
                    }}
                    className="px-3 py-1 text-sm text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    className={`px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                      commentText.trim()
                        ? 'bg-accent-blue hover:bg-accent-hover text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}