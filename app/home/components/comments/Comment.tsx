'use client';

import { useState } from 'react';
import { Comment as CommentType } from '../../../types';
import UserAvatar from '../ui/UserAvatar';

interface CommentProps {
  comment: CommentType;
  onReply: (commentId: string, content: string) => void;
  onLike: (commentId: string) => void;
  currentUser?: {
    id: string;
    avatar: string;
    displayName: string;
  };
}

export default function Comment({ comment, onReply, onLike, currentUser }: CommentProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isLiked, setIsLiked] = useState(comment.likedByCurrentUser);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const maxNestingLevel = 5;
  const indentation = Math.min(comment.level, maxNestingLevel) * 40;
  const hasReplies = comment.replies.length > 0;
  const totalReplies = comment.repliesCount + comment.replies.reduce((sum, reply) => sum + reply.repliesCount, 0);

  const handleReply = () => {
    if (!currentUser) return;
    setShowReplyInput(true);
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim() || !currentUser) return;
    onReply(comment.id, replyContent.trim());
    setReplyContent('');
    setShowReplyInput(false);
  };

  const handleLike = () => {
    if (!currentUser) return;
    setIsLiked(!isLiked);
    onLike(comment.id);
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

  return (
    <div className="relative">
      {/* Connecting line for replies */}
      {comment.level > 0 && (
        <div
          className="absolute left-6 top-8 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"
          style={{ left: `${comment.level * 40 - 16}px` }}
        />
      )}

      <div
        className={`relative ${comment.level > 0 ? 'pt-4' : ''}`}
        style={{ marginLeft: comment.level > 0 ? `${indentation}px` : '0' }}
      >
        <div className="flex space-x-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <UserAvatar
              src={comment.author.avatar}
              alt={comment.author.displayName}
              size="sm"
            />
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            {/* Comment Header */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-primary hover:underline cursor-pointer">
                {comment.author.displayName}
                {comment.author.verified && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-accent-blue inline-block ml-1">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.41 2.26 2.26 4.8-5.21 1.41 1.41L10.54 16.2z"/>
                  </svg>
                )}
              </span>
              <span className="text-sm text-secondary">
                @{comment.author.username} · {formatRelativeTime(comment.createdAt)}
              </span>
            </div>

            {/* Comment Text */}
            <div className="mt-1 text-primary whitespace-pre-wrap break-words leading-normal">
              {comment.content.split(' ').map((word, index) => {
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
              })}
            </div>

            {/* Comment Actions */}
            <div className="mt-2 flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                  isLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-secondary hover:text-primary'
                }`}
                disabled={!currentUser}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"/>
                </svg>
                <span>{isLiked ? comment.likesCount + 1 : comment.likesCount}</span>
              </button>

              <button
                onClick={handleReply}
                className="text-sm text-secondary hover:text-primary transition-colors duration-200"
                disabled={!currentUser}
              >
                Reply
              </button>

              {hasReplies && (
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-sm text-secondary hover:text-primary transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>{isCollapsed ? '▶' : '▼'}</span>
                  <span>{totalReplies} {totalReplies === 1 ? 'reply' : 'replies'}</span>
                </button>
              )}
            </div>

            {/* Reply Input */}
            {showReplyInput && currentUser && (
              <div className="mt-3 space-y-2">
                <div className="flex space-x-3">
                  <UserAvatar
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    size="sm"
                  />
                  <div className="flex-1">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full px-3 py-2 bg-secondary border border-custom rounded-lg text-primary placeholder:text-secondary resize-none focus:outline-none focus:border-accent-blue transition-colors duration-200"
                      rows={2}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowReplyInput(false);
                      setReplyContent('');
                    }}
                    className="px-4 py-1.5 text-sm text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim()}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                      replyContent.trim()
                        ? 'bg-accent-blue hover:bg-accent-hover text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {hasReplies && !isCollapsed && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}