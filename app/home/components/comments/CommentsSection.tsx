'use client';

import { useState } from 'react';
import { Comment as CommentType } from '../../../types';
import Comment from './Comment';

interface CommentsSectionProps {
  comments: CommentType[];
  onAddComment?: (content: string) => void;
  onReplyComment?: (parentCommentId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
  currentUser?: {
    id: string;
    avatar: string;
    displayName: string;
  };
  title?: string;
  placeholder?: string;
  sortBy?: 'newest' | 'oldest' | 'popular';
  showSortOptions?: boolean;
}

export default function CommentsSection({
  comments,
  onAddComment,
  onReplyComment,
  onLikeComment,
  currentUser,
  title = "Comments",
  placeholder = "Share your thoughts...",
  sortBy = 'newest',
  showSortOptions = true
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState<CommentType[]>(comments);
  const [currentSortBy, setCurrentSortBy] = useState<'newest' | 'oldest' | 'popular'>(sortBy);

  // Sort comments based on the selected criteria
  const getSortedComments = (commentsList: CommentType[]) => {
    const sorted = [...commentsList];
    switch (currentSortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      case 'popular':
        return sorted.sort((a, b) => {
          const aScore = a.likesCount + a.repliesCount * 2;
          const bScore = b.likesCount + b.repliesCount * 2;
          return bScore - aScore;
        });
      default:
        return sorted;
    }
  };

  const handleAddComment = (content: string) => {
    if (!content.trim() || !currentUser) return;

    const newCommentData: CommentType = {
      id: `comment-${Date.now()}`,
      author: {
        id: currentUser.id,
        username: 'john_developer',
        displayName: currentUser.displayName,
        avatar: currentUser.avatar,
        bio: '',
        location: '',
        website: '',
        joinDate: new Date(),
        followersCount: 0,
        followingCount: 0,
        tweetsCount: 0,
        verified: false
      },
      content: content.trim(),
      createdAt: new Date(),
      likesCount: 0,
      repliesCount: 0,
      likedByCurrentUser: false,
      replies: [],
      level: 0
    };

    setAllComments([newCommentData, ...allComments]);
    if (onAddComment) {
      onAddComment(content.trim());
    }
    setNewComment('');
  };

  const handleReplyComment = (parentCommentId: string, content: string) => {
    if (!content.trim() || !currentUser) return;

    const newReply: CommentType = {
      id: `reply-${Date.now()}`,
      author: {
        id: currentUser.id,
        username: 'john_developer',
        displayName: currentUser.displayName,
        avatar: currentUser.avatar,
        bio: '',
        location: '',
        website: '',
        joinDate: new Date(),
        followersCount: 0,
        followingCount: 0,
        tweetsCount: 0,
        verified: false
      },
      content: content.trim(),
      createdAt: new Date(),
      likesCount: 0,
      repliesCount: 0,
      likedByCurrentUser: false,
      replies: [],
      parentCommentId,
      level: 0 // will be calculated recursively
    };

    const updatedComments = addReplyToComment(allComments, parentCommentId, newReply);
    setAllComments(updatedComments);

    if (onReplyComment) {
      onReplyComment(parentCommentId, content.trim());
    }
  };

  const handleLikeComment = (commentId: string) => {
    const updatedComments = updateCommentLike(allComments, commentId);
    setAllComments(updatedComments);

    if (onLikeComment) {
      onLikeComment(commentId);
    }
  };

  // Recursive function to add reply to the correct comment
  const addReplyToComment = (comments: CommentType[], parentCommentId: string, reply: CommentType): CommentType[] => {
    return comments.map(comment => {
      if (comment.id === parentCommentId) {
        const parentLevel = comment.level;
        return {
          ...comment,
          replies: [...comment.replies, { ...reply, level: parentLevel + 1 }],
          repliesCount: comment.repliesCount + 1
        };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, parentCommentId, reply)
        };
      }
      return comment;
    });
  };

  // Recursive function to update like status
  const updateCommentLike = (comments: CommentType[], commentId: string): CommentType[] => {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likedByCurrentUser: !comment.likedByCurrentUser,
          likesCount: comment.likedByCurrentUser ? comment.likesCount - 1 : comment.likesCount + 1
        };
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateCommentLike(comment.replies, commentId)
        };
      }
      return comment;
    });
  };

  const handleSubmitNewComment = () => {
    handleAddComment(newComment);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      handleSubmitNewComment();
    }
  };

  const sortedComments = getSortedComments(allComments);
  const totalComments = allComments.length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Enhanced Section Header */}
      <div className="border-b border-custom pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-primary">{title}</h2>
            <p className="text-sm text-secondary mt-1">
              {totalComments} {totalComments === 1 ? 'comment' : 'comments'} · Join the conversation
            </p>
          </div>

          {showSortOptions && totalComments > 0 && (
            <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
              <button
                onClick={() => setCurrentSortBy('popular')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentSortBy === 'popular'
                    ? 'bg-primary text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                🔥 Popular
              </button>
              <button
                onClick={() => setCurrentSortBy('newest')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentSortBy === 'newest'
                    ? 'bg-primary text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                🆕 Newest
              </button>
              <button
                onClick={() => setCurrentSortBy('oldest')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentSortBy === 'oldest'
                    ? 'bg-primary text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                📅 Oldest
              </button>
            </div>
          )}
        </div>
      </div>

  
      {/* Enhanced Comments List */}
      <div className="space-y-1">
        {totalComments === 0 ? (
          <div className="text-center py-16 bg-secondary/30 rounded-2xl border-2 border-dashed border-custom">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-secondary">
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01c.52 0 1.02.088 1.49.253.927.318 1.735.888 2.338 1.64.77 1.03 1.2 2.32 1.2 3.67 0 1.8-.9 3.57-2.638 5.01z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">No comments yet</h3>
            <p className="text-secondary max-w-md mx-auto">
              Be the first to share your thoughts and start the conversation! Your feedback helps build a better community.
            </p>
          </div>
        ) : (
          <>
            {/* Comments Summary */}
            {totalComments > 5 && (
              <div className="mb-4 p-4 bg-secondary/50 rounded-lg border border-custom">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                      <span className="text-secondary">{totalComments} participants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-secondary">Active discussion</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentSortBy('popular')}
                    className="text-accent-blue hover:text-accent-hover text-sm font-medium transition-colors duration-200"
                  >
                    📈 View most popular comments
                  </button>
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="space-y-1">
              {sortedComments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={handleReplyComment}
                  onLike={handleLikeComment}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}