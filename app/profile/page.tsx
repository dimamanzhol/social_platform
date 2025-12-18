'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import MobileBottomNav from '../home/components/navigation/MobileBottomNav';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import PostCard from '../home/components/feed/PostCard';
import ComposeTweet from '../home/components/feed/ComposeTweet';
import CommentsSection from '../home/components/comments/CommentsSection';
import { mockComments } from '../home/data/mockComments';
import { currentUser } from '../home/data/mockData';
import { useState } from 'react';

export default function Profile() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'likes'>('posts');

  // Filter mock data for user's posts
  const userPosts = [
    {
      id: 'user-1',
      authorId: currentUser.id,
      author: currentUser,
      content: 'Just shipped my first React component library! 🚀 It\'s fully typed, accessible, and comes with dark mode support. Check it out on GitHub!',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likesCount: 234,
      repostsCount: 45,
      repliesCount: 67,
      viewsCount: 12345,
      bookmarksCount: 89,
      likedByCurrentUser: true,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: false,
      language: 'en',
      source: 'X for iPhone',
    },
    {
      id: 'user-2',
      authorId: currentUser.id,
      author: currentUser,
      content: 'Learning TypeScript has been a game-changer for my development workflow. The type safety and IntelliSense are incredible! 💻\n\n#TypeScript #WebDev',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likesCount: 567,
      repostsCount: 89,
      repliesCount: 123,
      viewsCount: 45678,
      bookmarksCount: 234,
      likedByCurrentUser: false,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: true,
      language: 'en',
      source: 'Web App',
    },
    {
      id: 'user-3',
      authorId: currentUser.id,
      author: currentUser,
      content: 'The best thing about being a developer? You get to solve problems and build things that help people every single day. 🌟\n\nWhat\'s your favorite part about coding?',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      likesCount: 1890,
      repostsCount: 234,
      repliesCount: 567,
      viewsCount: 123456,
      bookmarksCount: 789,
      likedByCurrentUser: false,
      repostedByCurrentUser: true,
      bookmarkedByCurrentUser: false,
      language: 'en',
      source: 'X for iPhone',
    }
  ];

  const handleNewTweet = (content: string) => {
    console.log('New tweet:', content);
  };

  const handlePostClick = (tweetId: string) => {
    setExpandedPost(expandedPost === tweetId ? null : tweetId);
  };

  const handleAddComment = (content: string) => {
    console.log('New comment:', content);
  };

  const handleReplyComment = (parentCommentId: string, content: string) => {
    console.log('Reply to', parentCommentId, ':', content);
  };

  const handleLikeComment = (commentId: string) => {
    console.log('Liked comment:', commentId);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <MainLayout
      leftSidebar={<NavigationMenu />}
      mobileBottomNav={<MobileBottomNav />}
      rightSidebar={
        <>
          <TrendingSection trendingTopics={[]} />
          <WhoToFollow suggestions={[]} />
        </>
      }
    >
      {/* Profile Header */}
      <div className="bg-card">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-[#FF5722] to-[#FF7043]"></div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-32 h-32 rounded-full border-4 border-bg-card object-cover"
            />
          </div>

          {/* Profile Actions */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary mb-1">
                {currentUser.displayName}
              </h1>
              <p className="text-secondary mb-3">@{currentUser.username}</p>
              <p className="text-primary mb-4">{currentUser.bio}</p>

              {/* Profile Details */}
              <div className="flex flex-wrap gap-4 text-sm text-secondary mb-3">
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{currentUser.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  <span>{currentUser.website}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Joined {currentUser.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Follow Stats */}
              <div className="flex gap-4">
                <div className="flex">
                  <span className="font-bold text-primary">{formatNumber(currentUser.followingCount)}</span>
                  <span className="text-secondary ml-1">Following</span>
                </div>
                <div className="flex">
                  <span className="font-bold text-primary">{formatNumber(currentUser.followersCount)}</span>
                  <span className="text-secondary ml-1">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="bg-card border-b border-default">
        <div className="flex">
          <button
            className={`flex-1 py-4 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'posts' ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5722] rounded-full"></div>
            )}
          </button>
          <button
            className={`flex-1 py-4 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'replies' ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveTab('replies')}
          >
            Replies
            {activeTab === 'replies' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5722] rounded-full"></div>
            )}
          </button>
          <button
            className={`flex-1 py-4 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'likes' ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveTab('likes')}
          >
            Likes
            {activeTab === 'likes' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5722] rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div>
        {activeTab === 'posts' && (
          <>
            <ComposeTweet
              onTweet={handleNewTweet}
              userAvatar={currentUser.avatar}
              userName={currentUser.displayName}
              placeholder="What's happening?! 🚀"
            />
            {userPosts.map((post) => (
              <div key={post.id}>
                <PostCard
                  tweet={post}
                  onClick={() => handlePostClick(post.id)}
                />
                {expandedPost === post.id && (
                  <CommentsSection
                    comments={mockComments}
                    onAddComment={handleAddComment}
                    onReplyComment={handleReplyComment}
                    onLikeComment={handleLikeComment}
                    currentUser={currentUser}
                    showSortOptions={false}
                    title=""
                  />
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === 'replies' && (
          <div className="p-8 text-center text-secondary">
            <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto mb-4 text-secondary opacity-50" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <p className="text-lg font-medium mb-2">No replies yet</p>
            <p>When someone replies to your posts, they'll appear here.</p>
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="p-8 text-center text-secondary">
            <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto mb-4 text-secondary opacity-50" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <p className="text-lg font-medium mb-2">No liked posts</p>
            <p>When you like posts, they'll appear here.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}