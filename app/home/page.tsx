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

export default function Home() {
  // Filter out reply tweets for the main feed
  const mainFeedTweets = mockTweets.filter(tweet => !tweet.replyToTweetId);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

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
      <div className="border-b border-custom">
        <FeedHeader />
      </div>

      {/* Tweet Feed with integrated compose */}
      <div>
        <ComposeTweet
          onTweet={handleNewTweet}
          userAvatar={currentUser.avatar}
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
      </div>
    </MainLayout>
  );
}
