'use client';

import MainLayout from '../home/components/layout/MainLayout';
import NavigationMenu from '../home/components/navigation/NavigationMenu';
import MobileBottomNav from '../home/components/navigation/MobileBottomNav';
import TrendingSection from '../home/components/trending/TrendingSection';
import WhoToFollow from '../home/components/trending/WhoToFollow';
import PostCard from '../home/components/feed/PostCard';
import CommentsSection from '../home/components/comments/CommentsSection';
import { mockComments } from '../home/data/mockComments';
import { mockUsers } from '../home/data/mockData';
import { useState } from 'react';

export default function LikesPage() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  // Filter tweets that the user has liked (simulate user's liked posts)
  const likedTweets = [
    {
      id: 'liked-1',
      authorId: '1',
      author: mockUsers[0], // Elon Musk
      content: 'Just had a great meeting about the future of sustainable energy. The transition to electric vehicles is accelerating faster than most people think.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likesCount: 456789,
      repostsCount: 12345,
      repliesCount: 7890,
      viewsCount: 5432109,
      bookmarksCount: 12345,
      likedByCurrentUser: true,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: false,
      language: 'en',
      source: 'X for iPhone',
    },
    {
      id: 'liked-2',
      authorId: '2',
      author: mockUsers[1], // OpenAI
      content: 'GPT-4 Turbo is now available to all Plus users. We have improved performance and reduced costs by 3x. The future of AI assistance is here! https://openai.com/gpt-4-turbo',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      likesCount: 234567,
      repostsCount: 8765,
      repliesCount: 4321,
      viewsCount: 3210987,
      bookmarksCount: 9876,
      likedByCurrentUser: true,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: true,
      language: 'en',
      source: 'Web App',
    },
    {
      id: 'liked-3',
      authorId: '3',
      author: mockUsers[2], // Sundar Pichai
      content: 'Excited to share our latest quantum computing breakthrough. We have achieved error correction that brings practical quantum computers one step closer to reality. #QuantumComputing #GoogleAI',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      likesCount: 345678,
      repostsCount: 9876,
      repliesCount: 5432,
      viewsCount: 2345678,
      bookmarksCount: 6543,
      likedByCurrentUser: true,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: false,
      language: 'en',
      source: 'Twitter for Android',
    },
    {
      id: 'liked-4',
      authorId: '4',
      author: mockUsers[3], // Satya Nadella
      content: 'Microsoft Copilot is transforming how people work and create. Seeing developers build entire applications with natural language is incredible. The AI revolution is just beginning.',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      likesCount: 234567,
      repostsCount: 7654,
      repliesCount: 3210,
      viewsCount: 1987654,
      bookmarksCount: 8765,
      likedByCurrentUser: true,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: false,
      language: 'en',
      source: 'LinkedIn',
    },
    {
      id: 'liked-5',
      authorId: '5',
      author: mockUsers[4], // Tim Cook
      content: 'Apple Vision Pro is changing how we interact with technology. The spatial computing era has begun. This is just the beginning of what is possible when you blend the digital and physical worlds seamlessly.',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      likesCount: 567890,
      repostsCount: 15432,
      repliesCount: 8765,
      viewsCount: 6789012,
      bookmarksCount: 15432,
      likedByCurrentUser: true,
      repostedByCurrentUser: false,
      bookmarkedByCurrentUser: true,
      language: 'en',
      source: 'X for iPhone',
    }
  ];

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
          <TrendingSection trendingTopics={[]} />
          <WhoToFollow suggestions={[]} />
        </>
      }
    >
      {/* Page Header */}
      <div className="bg-card sticky top-0 z-10 border-b border-default">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <button
              className="mr-4 p-2 rounded-full hover:bg-hover transition-colors duration-200"
              onClick={() => window.history.back()}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-primary">Likes</h1>
              <p className="text-sm text-secondary">
                {likedTweets.length} {likedTweets.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liked Posts */}
      <div>
        {likedTweets.length > 0 ? (
          likedTweets.map((tweet) => (
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
                  currentUser={mockUsers[0]} // Using Elon as current user for comments
                  showSortOptions={false}
                  title=""
                />
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-secondary">
            <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-4 text-secondary opacity-50" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <p className="text-xl font-medium mb-2">No liked posts yet</p>
            <p className="text-secondary mb-4">When you like posts, they will appear here.</p>
            <button className="px-4 py-2 bg-[#FF5722] text-white rounded-full font-medium hover:bg-[#E64516] transition-colors duration-200">
              Explore posts
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}