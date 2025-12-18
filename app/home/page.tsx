'use client';

import MainLayout from './components/layout/MainLayout';
import NavigationMenu from './components/navigation/NavigationMenu';
import MobileBottomNav from './components/navigation/MobileBottomNav';
import FeedHeader from './components/feed/FeedHeader';
import PostCard from './components/feed/PostCard';
import ComposeTweet from './components/feed/ComposeTweet';
import CommentsSection from './components/comments/CommentsSection';
import TrendingSection from './components/trending/TrendingSection';
import WhoToFollow from './components/trending/WhoToFollow';
import { mockTweets, mockTrendingTopics, mockFollowSuggestions, currentUser } from './data/mockData';
import { mockComments } from './data/mockComments';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserProfile } from '../../contexts/UserContext';

export default function Home() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { userProfile, loading: profileLoading } = useUserProfile();

  // Move all hooks to the top before any conditional returns
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');

  if (!clerkLoaded || profileLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to continue</h1>
          <p className="text-gray-400">You need to be authenticated to view this page.</p>
        </div>
      </div>
    );
  }

  // Use the user profile from Supabase, fallback to Clerk data if needed
  const currentUser = userProfile || {
    id: user.id,
    username: user.username || 'user',
    displayName: user.firstName || user.fullName || 'User',
    avatar: user.imageUrl || '',
  };

  // Filter out reply tweets for the main feed
  const mainFeedTweets = mockTweets.filter(tweet => !tweet.replyToTweetId);
  const followingTweets = mockTweets.filter(tweet => !tweet.replyToTweetId && tweet.authorId !== '1'); // Filter out non-followed users

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
      <FeedHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tweet Feed with integrated compose */}
      <div>
        {activeTab === 'foryou' && (
          <>
            <ComposeTweet
              onTweet={handleNewTweet}
              userAvatar={currentUser.avatar || currentUser.avatar_url}
              userName={currentUser.displayName}
            />
            {mainFeedTweets.map((tweet) => (
          <div key={tweet.id}>
            <PostCard
              tweet={tweet}
              onClick={() => handlePostClick(tweet.id)}
            />
            {expandedPost === tweet.id && (
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

        {activeTab === 'following' && (
          <>
            <ComposeTweet
              onTweet={handleNewTweet}
              userAvatar={currentUser.avatar || currentUser.avatar_url}
              userName={currentUser.displayName}
            />
            {followingTweets.map((tweet) => (
              <div key={tweet.id}>
                <PostCard
                  tweet={tweet}
                  onClick={() => handlePostClick(tweet.id)}
                />
                {expandedPost === tweet.id && (
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
      </div>
    </MainLayout>
  );
}
