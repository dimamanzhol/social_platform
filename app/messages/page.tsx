'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import MessageList from './components/MessageList';
import ConversationView from './components/ConversationView';
import { mockTrendingTopics, mockFollowSuggestions } from '../home/data/mockData';

export default function Messages() {
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
      {/* Messages Container */}
      <div className="flex h-[calc(100vh-53px)]">
        {/* Message List */}
        <div className="w-80 border-r border-custom flex-shrink-0">
          <MessageList />
        </div>

        {/* Conversation View */}
        <div className="flex-1">
          <ConversationView />
        </div>
      </div>
    </MainLayout>
  );
}