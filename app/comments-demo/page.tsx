'use client';

import { useState } from 'react';
import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import MobileBottomNav from '../home/components/navigation/MobileBottomNav';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import CommentsSection from '../home/components/comments/CommentsSection';
import PostCard from '../home/components/comments/PostCard';
import { mockComments, currentUser } from '../home/data/mockComments';
import { mockPost } from '../home/data/mockPost';
import { mockTrendingTopics, mockFollowSuggestions } from '../home/data/mockData';

export default function CommentsDemo() {
  const [comments, setComments] = useState(mockComments);
  const [post, setPost] = useState(mockPost);
  const [activeTab, setActiveTab] = useState<'comments' | 'likes' | 'shares' | 'analytics'>('comments');

  const handleAddComment = (content: string) => {
    // Create new comment and add to comments list
    const newComment = {
      id: `comment-${Date.now()}`,
      author: {
        id: currentUser.id,
        username: 'current_user',
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
      content: content,
      createdAt: new Date(),
      likesCount: 0,
      repliesCount: 0,
      likedByCurrentUser: false,
      replies: [],
      level: 0
    };

    setComments([newComment, ...comments]);
    // Update post reply count
    setPost(prev => ({
      ...prev,
      repliesCount: prev.repliesCount + 1
    }));
  };

  const handleReplyComment = (parentCommentId: string, content: string) => {
    console.log('Reply to', parentCommentId, ':', content);
    // In a real app, this would save to a backend
  };

  const handleLikeComment = (commentId: string) => {
    console.log('Liked comment:', commentId);
    // In a real app, this would update the backend
  };

  const handlePostLike = () => {
    setPost(prev => ({
      ...prev,
      likedByCurrentUser: !prev.likedByCurrentUser,
      likesCount: prev.likedByCurrentUser ? prev.likesCount - 1 : prev.likesCount + 1
    }));
  };

  const handlePostRepost = () => {
    setPost(prev => ({
      ...prev,
      repostedByCurrentUser: !prev.repostedByCurrentUser,
      repostsCount: prev.repostedByCurrentUser ? prev.repostsCount - 1 : prev.repostsCount + 1
    }));
  };

  const handlePostBookmark = () => {
    setPost(prev => ({
      ...prev,
      bookmarkedByCurrentUser: !prev.bookmarkedByCurrentUser,
      bookmarksCount: prev.bookmarkedByCurrentUser ? prev.bookmarksCount - 1 : prev.bookmarksCount + 1
    }));
  };

  const handlePostShare = () => {
    console.log('Share post');
    // In a real app, this would open share dialog
  };

  const handlePostComment = () => {
    console.log('Open comment modal');
    // In a real app, this would scroll to comments
  };

  return (
    <MainLayout
      leftSidebar={<NavigationMenu />}
      mobileBottomNav={<MobileBottomNav />}
      rightSidebar={
        <>
          <TrendingSection trendingTopics={mockTrendingTopics} />
          <WhoToFollow suggestions={mockFollowSuggestions} />
        </>
      }
    >
      <div className="border-b border-custom">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Advanced Comments System</h1>
          <p className="text-secondary text-sm mt-1">
            Next-gen threaded commenting with Instagram/Threads visual design and rich interactions
          </p>
        </div>
      </div>

      <div className="p-4 max-w-5xl mx-auto">
        {/* Interactive Post */}
        <div className="mb-8">
          <PostCard
            post={post}
            onComment={handlePostComment}
            onAddComment={handleAddComment}
            onLike={handlePostLike}
            onRepost={handlePostRepost}
            onBookmark={handlePostBookmark}
            onShare={handlePostShare}
            currentUser={currentUser}
          />
        </div>

  
        {/* Comments Section with Enhanced Features */}
        <CommentsSection
          comments={comments}
          onAddComment={handleAddComment}
          onReplyComment={handleReplyComment}
          onLikeComment={handleLikeComment}
          currentUser={currentUser}
          title="💬 Community Discussion"
          placeholder="Share your thoughts and join the conversation..."
          sortBy="popular"
          showSortOptions={true}
        />

        </div>
    </MainLayout>
  );
}