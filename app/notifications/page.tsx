'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import MobileBottomNav from '../home/components/navigation/MobileBottomNav';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import NotificationTabs from './components/NotificationTabs';
import NotificationList from './components/NotificationList';
import { mockNotifications, mockTrendingTopics, mockFollowSuggestions } from '../home/data/mockData';

export default function Notifications() {
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
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-primary">Notifications</h1>
          <button className="p-2 rounded-full hover:bg-hover transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-primary">
              <path d="M3.5 8.5C3.5 6.01 5.51 4 8 4h8c2.49 0 4.5 2.01 4.5 4.5v7c0 2.49-2.01 4.5-4.5 4.5H8c-2.49 0-4.5-2.01-4.5-4.5v-7zM8 6c-1.38 0-2.5 1.12-2.5 2.5v7c0 1.38 1.12 2.5 2.5 2.5h8c1.38 0 2.5-1.12 2.5-2.5v-7C18.5 7.12 17.38 6 16 6H8zm7.5 3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S14 11.33 14 10.5 14.67 9 15.5 9zM8 13h8v2H8v-2z"/>
            </svg>
          </button>
        </div>
        <NotificationTabs />
      </div>

      {/* Notifications List */}
      <NotificationList />
    </MainLayout>
  );
}