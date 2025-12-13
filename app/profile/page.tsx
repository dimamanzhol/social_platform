'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import PostCard from '../home/components/feed/PostCard';
import { mockTrendingTopics, mockFollowSuggestions, mockTweets, mockUsers } from '../home/data/mockData';

export default function Profile() {
  // Use the first mock user as the profile owner
  const profileUser = mockUsers[0]; // Elon Musk

  // Filter tweets by this user
  const userTweets = mockTweets.filter(tweet => tweet.authorId === profileUser.id);

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
      {/* Profile Header */}
      <ProfileHeader user={profileUser} />

      {/* Profile Tabs */}
      <ProfileTabs />

      {/* User's Tweets */}
      <div>
        {userTweets.map((tweet) => (
          <PostCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </MainLayout>
  );
}