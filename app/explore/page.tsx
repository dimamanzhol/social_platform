'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import SearchBar from './components/SearchBar';
import ExploreTabs from './components/ExploreTabs';
import ContentGrid from './components/ContentGrid';
import { mockTrendingTopics, mockFollowSuggestions } from '../home/data/mockData';

export default function Explore() {
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
      {/* Header with Search */}
      <div className="border-b border-custom sticky top-0 bg-primary bg-opacity-90 backdrop-blur-md z-10">
        <div className="p-4">
          <SearchBar />
        </div>
        <ExploreTabs />
      </div>

      {/* Content Grid */}
      <div className="p-4">
        <ContentGrid />
      </div>
    </MainLayout>
  );
}