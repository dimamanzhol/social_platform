'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import MobileBottomNav from '../home/components/navigation/MobileBottomNav';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import PostCard from '../home/components/feed/PostCard';
import { mockTweets, mockTrendingTopics, mockFollowSuggestions } from '../home/data/mockData';
import { useState } from 'react';

export default function Explore() {
  const [activeTab, setActiveTab] = useState<'trending' | 'foryou' | 'tech'>('trending');

  // Filter and prepare content for different tabs
  const trendingTweets = mockTweets.slice(0, 5); // Top 5 most engaging posts
  const forYouTweets = mockTweets.slice(2, 7); // Different mix of posts
  const techTweets = mockTweets.filter(tweet =>
    tweet.content.toLowerCase().includes('ai') ||
    tweet.content.toLowerCase().includes('quantum') ||
    tweet.content.toLowerCase().includes('microsoft') ||
    tweet.content.toLowerCase().includes('apple') ||
    tweet.content.toLowerCase().includes('tesla')
  );

  const getTweetsForTab = () => {
    switch (activeTab) {
      case 'trending':
        return trendingTweets;
      case 'foryou':
        return forYouTweets;
      case 'tech':
        return techTweets;
      default:
        return trendingTweets;
    }
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
          <TrendingSection trendingTopics={mockTrendingTopics} />
          <WhoToFollow suggestions={mockFollowSuggestions} />
        </>
      }
    >
      {/* Header */}
      <div className="bg-card sticky top-0 z-10 border-b border-default">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-primary">Explore</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <svg
              viewBox="0 0 24 24"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search posts, users, and topics..."
              className="w-full pl-16 pr-4 py-2.5 bg-gray-50 rounded-full text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:ring-opacity-50 text-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex">
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'trending' ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveTab('trending')}
          >
            Trending
            {activeTab === 'trending' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5722] rounded-full"></div>
            )}
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'foryou' ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveTab('foryou')}
          >
            For you
            {activeTab === 'foryou' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5722] rounded-full"></div>
            )}
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 relative ${
              activeTab === 'tech' ? 'text-primary' : 'text-secondary hover:text-primary'
            }`}
            onClick={() => setActiveTab('tech')}
          >
            Tech
            {activeTab === 'tech' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF5722] rounded-full"></div>
            )}
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-card border-b border-default">
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold text-primary mb-4">Trending now</h2>
          <div className="space-y-3">
            {mockTrendingTopics.slice(0, 4).map((trend, index) => (
              <div key={trend.id} className="hover:bg-hover p-3 rounded-xl transition-all duration-200 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Trend Number */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-secondary bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-xs text-secondary uppercase tracking-wide font-medium">
                        {trend.category}
                      </span>
                    </div>

                    {/* Trend Name */}
                    <p className="font-semibold text-primary text-base mb-1 group-hover:text-[#FF5722] transition-colors duration-200">
                      {trend.name}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-secondary">
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        {formatNumber(trend.tweetsCount)} posts
                      </span>
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22.58 7.35l-1.09-2.09a.78.78 0 0 0-1.08-.3l-1.09.64a1.49 1.49 0 0 0-.68 1.68 2.45 2.45 0 0 0-1.92-1.38 2.45 2.45 0 0 0-1.92 1.38 1.49 1.49 0 0 0-.68-1.68l-1.09-.64a.78.78 0 0 0-1.08.3l-1.09 2.09a.78.78 0 0 0 .27 1.07l1.09.64a1.49 1.49 0 0 0 1.68-.68 2.45 2.45 0 0 0 1.38 1.92 2.45 2.45 0 0 0 1.38-1.92 1.49 1.49 0 0 0 1.68.68l1.09-.64a.78.78 0 0 0 .27-1.07z"/>
                        </svg>
                        Trending
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {getTweetsForTab().map((tweet) => (
          <PostCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </MainLayout>
  );
}