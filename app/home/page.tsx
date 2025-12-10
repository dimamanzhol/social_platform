'use client';

import MainLayout from './components/layout/MainLayout';
import NavigationMenu from './components/navigation/NavigationMenu';
import FeedHeader from './components/feed/FeedHeader';
import PostCard from './components/feed/PostCard';
import TrendingSection from './components/trending/TrendingSection';
import WhoToFollow from './components/trending/WhoToFollow';
import { mockTweets, mockTrendingTopics, mockFollowSuggestions } from './data/mockData';

export default function Home() {
  // Filter out reply tweets for the main feed
  const mainFeedTweets = mockTweets.filter(tweet => !tweet.replyToTweetId);

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

      {/* New Tweet Compose Area */}
      <div className="border-b border-custom p-4">
        <div className="flex space-x-3">
          <img
            src="https://unavatar.io/john"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              placeholder="What is happening?!"
              className="w-full bg-transparent text-primary placeholder:text-secondary text-xl resize-none focus:outline-none"
              rows={2}
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM19 8H5v2h14V8zm0 4H5v2h14v-2z"/>
                  </svg>
                </button>
                <button className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM5 8v10h14V8H5z"/>
                  </svg>
                </button>
                <button className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </button>
                <button className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"/>
                  </svg>
                </button>
              </div>
              <button className="bg-accent-blue hover:bg-accent-hover text-white px-4 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tweet Feed */}
      <div>
        {mainFeedTweets.map((tweet) => (
          <PostCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </MainLayout>
  );
}
