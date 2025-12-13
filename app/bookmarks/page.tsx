'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import MobileBottomNav from '../home/components/navigation/MobileBottomNav';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import PostCard from '../home/components/feed/PostCard';
import BookmarkHeader from './components/BookmarkHeader';
import { mockTrendingTopics, mockFollowSuggestions, mockBookmarkedTweets } from '../home/data/mockData';

// For demo purposes, start with empty bookmarks to show empty state
const displayBookmarks = mockBookmarkedTweets; // Change to [] to see empty state

export default function Bookmarks() {
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
      {/* Header */}
      <div className="border-b border-custom sticky top-0 bg-primary bg-opacity-90 backdrop-blur-md z-10">
        <BookmarkHeader />
      </div>

      {/* Bookmarked Tweets */}
      {displayBookmarks.length > 0 ? (
        <div>
          {displayBookmarks.map((tweet) => (
            <PostCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 mb-4 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current text-secondary">
              <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">You haven't added any Tweets to your Bookmarks yet</h2>
          <p className="text-secondary text-center max-w-md">
            When you do, they'll show up here. You can find them later in this tab.
          </p>
          <button className="mt-6 bg-accent-blue hover:bg-accent-hover text-white px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
            Explore posts to bookmark
          </button>
        </div>
      )}
    </MainLayout>
  );
}