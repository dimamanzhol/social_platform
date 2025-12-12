'use client';

import MainLayout from './components/layout/MainLayout';
import NavigationMenu from './components/navigation/NavigationMenu';
import FeedHeader from './components/feed/FeedHeader';
import PostCard from './components/feed/PostCard';
import ComposeTweet from './components/feed/ComposeTweet';
import TrendingSection from './components/trending/TrendingSection';
import WhoToFollow from './components/trending/WhoToFollow';
import { mockTweets, mockTrendingTopics, mockFollowSuggestions, currentUser } from './data/mockData';

export default function Home() {
  // Filter out reply tweets for the main feed
  const mainFeedTweets = mockTweets.filter(tweet => !tweet.replyToTweetId);

  const handleNewTweet = (content: string) => {
    console.log('New tweet:', content);
    // TODO: Add tweet to feed (will integrate with state management later)
  };

  return (
    <MainLayout
      leftSidebar={<NavigationMenu />}
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
          <PostCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </MainLayout>
  );
}
