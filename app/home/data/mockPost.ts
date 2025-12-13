import { Tweet, User } from '../../types';

// Enhanced post author data
const postAuthor: User = {
  id: 'author-1',
  username: 'tech_innovator',
  displayName: 'Sarah Chen',
  avatar: 'https://unavatar.io/sarah',
  bio: 'Building the future of AI-powered social platforms 🚀',
  location: 'San Francisco, CA',
  website: 'sarahchen.dev',
  joinDate: new Date('2019-03-15'),
  followersCount: 45678,
  followingCount: 1234,
  tweetsCount: 8765,
  verified: true,
  pinnedTweetId: 'post-1'
};

// Comprehensive mock post for testing
export const mockPost: Tweet = {
  id: 'post-1',
  authorId: 'author-1',
  author: postAuthor,
  content: `🎯 Just shipped our biggest update yet!

We're introducing real-time collaborative commenting with:
✨ Threaded discussions like Instagram/Threads
🎨 Beautiful visual design with smooth animations
🔄 Live updates and notifications
📱 Perfect mobile experience

This changes how communities interact online. Built with Next.js 16, React 19, and Tailwind CSS v4. The future of social media is here! 🚀

#SocialMedia #WebDevelopment #NextJS #React #UI/UX #CommunityBuilding`,
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  likesCount: 1247,
  repostsCount: 342,
  repliesCount: 89,
  viewsCount: 45678,
  bookmarksCount: 234,
  likedByCurrentUser: false,
  repostedByCurrentUser: false,
  bookmarkedByCurrentUser: true,
  language: 'en',
  source: 'X for Web'
};

// Enhanced statistics for the post
export const postStats = {
  engagementRate: 3.2,
  trending: true,
  topComments: 5,
  activeDiscussion: true,
  lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  participants: 34
};