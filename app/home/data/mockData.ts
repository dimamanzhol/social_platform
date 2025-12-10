import { User, Tweet, TrendingTopic, FollowSuggestion } from '../types';

// Mock user data
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'elonmusk',
    displayName: 'Elon Musk',
    avatar: 'https://unavatar.io/elonmusk',
    bio: 'Chief Twit @X',
    location: 'Texas, USA',
    website: 'tesla.com',
    joinDate: new Date('2009-06-02'),
    followersCount: 198765432,
    followingCount: 876,
    tweetsCount: 32100,
    verified: true,
  },
  {
    id: '2',
    username: 'openai',
    displayName: 'OpenAI',
    avatar: 'https://unavatar.io/openai',
    bio: 'Creating safe AGI that benefits all of humanity.',
    location: 'San Francisco, CA',
    website: 'openai.com',
    joinDate: new Date('2015-12-11'),
    followersCount: 87654321,
    followingCount: 123,
    tweetsCount: 5432,
    verified: true,
  },
  {
    id: '3',
    username: 'sundarpichai',
    displayName: 'Sundar Pichai',
    avatar: 'https://unavatar.io/sundarpichai',
    bio: 'CEO of Google & Alphabet',
    location: 'Mountain View, CA',
    website: 'about.sundarpichai.com',
    joinDate: new Date('2015-06-01'),
    followersCount: 34567890,
    followingCount: 234,
    tweetsCount: 8765,
    verified: true,
  },
  {
    id: '4',
    username: 'satyanadella',
    displayName: 'Satya Nadella',
    avatar: 'https://unavatar.io/satyanadella',
    bio: 'Chairman and CEO, Microsoft',
    location: 'Redmond, WA',
    website: 'blogs.microsoft.com/blog/ceo/',
    joinDate: new Date('2014-02-04'),
    followersCount: 23456789,
    followingCount: 567,
    tweetsCount: 12345,
    verified: true,
  },
  {
    id: '5',
    username: 'tim_cook',
    displayName: 'Tim Cook',
    avatar: 'https://unavatar.io/tim_cook',
    bio: 'CEO of Apple',
    location: 'Cupertino, CA',
    website: 'apple.com',
    joinDate: new Date('2013-09-12'),
    followersCount: 147258369,
    followingCount: 98,
    tweetsCount: 13579,
    verified: true,
  },
  {
    id: '6',
    username: 'demis_hassabis',
    displayName: 'Demis Hassabis',
    avatar: 'https://unavatar.io/demis_hassabis',
    bio: 'CEO @GoogleDeepMind',
    location: 'London, UK',
    website: 'deepmind.com',
    joinDate: new Date('2014-03-17'),
    followersCount: 5432109,
    followingCount: 456,
    tweetsCount: 9876,
    verified: true,
  }
];

// Mock tweet data
export const mockTweets: Tweet[] = [
  {
    id: '1',
    authorId: '1',
    author: mockUsers[0], // Elon Musk
    content: 'Just had a great meeting about the future of sustainable energy. The transition to electric vehicles is accelerating faster than most people think. 🚗⚡',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likesCount: 456789,
    repostsCount: 12345,
    repliesCount: 7890,
    viewsCount: 5432109,
    bookmarksCount: 12345,
    likedByCurrentUser: false,
    repostedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    language: 'en',
    source: 'X for iPhone',
  },
  {
    id: '2',
    authorId: '2',
    author: mockUsers[1], // OpenAI
    content: 'GPT-4 Turbo is now available to all Plus users. We\'ve improved performance and reduced costs by 3x. The future of AI assistance is here! 🤖\n\nLearn more: openai.com/gpt-4-turbo',
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
    id: '3',
    authorId: '3',
    author: mockUsers[2], // Sundar Pichai
    content: 'Excited to share our latest quantum computing breakthrough. We\'ve achieved error correction that brings practical quantum computers one step closer to reality. 📊\n\n#QuantumComputing #GoogleAI',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likesCount: 345678,
    repostsCount: 9876,
    repliesCount: 5432,
    viewsCount: 2345678,
    bookmarksCount: 6543,
    likedByCurrentUser: false,
    repostedByCurrentUser: true,
    bookmarkedByCurrentUser: false,
    language: 'en',
    source: 'Twitter for Android',
  },
  {
    id: '4',
    authorId: '4',
    author: mockUsers[3], // Satya Nadella
    content: 'Microsoft Copilot is transforming how people work and create. Seeing developers build entire applications with natural language is incredible. The AI revolution is just beginning. 💻✨',
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
    id: '5',
    authorId: '5',
    author: mockUsers[4], // Tim Cook
    content: 'Apple Vision Pro is changing how we interact with technology. The spatial computing era has begun. This is just the beginning of what\'s possible when you blend the digital and physical worlds seamlessly. 🥽✨',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likesCount: 567890,
    repostsCount: 15432,
    repliesCount: 8765,
    viewsCount: 6789012,
    bookmarksCount: 15432,
    likedByCurrentUser: false,
    repostedByCurrentUser: false,
    bookmarkedByCurrentUser: true,
    language: 'en',
    source: 'X for iPhone',
  },
  {
    id: '6',
    authorId: '6',
    author: mockUsers[5], // Demis Hassabis
    content: 'AlphaFold has now predicted the structure of over 200 million proteins. This breakthrough is accelerating drug discovery and helping scientists tackle some of humanity\'s biggest challenges. 🧬🔬',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    likesCount: 189765,
    repostsCount: 6543,
    repliesCount: 2109,
    viewsCount: 1654321,
    bookmarksCount: 5432,
    likedByCurrentUser: true,
    repostedByCurrentUser: true,
    bookmarkedByCurrentUser: false,
    language: 'en',
    source: 'Web App',
  },
  {
    id: '7',
    authorId: '1',
    author: mockUsers[0], // Elon Musk - reply tweet
    content: '@openai This is great progress! Competition in AI benefits everyone. Looking forward to seeing what you build next.',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likesCount: 123456,
    repostsCount: 4321,
    repliesCount: 876,
    viewsCount: 876543,
    bookmarksCount: 3210,
    likedByCurrentUser: false,
    repostedByCurrentUser: false,
    bookmarkedByCurrentUser: false,
    replyToTweetId: '2',
    replyToUser: mockUsers[1],
    language: 'en',
    source: 'X for iPhone',
  }
];

// Mock trending topics
export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: '1',
    name: '#AIRevolution',
    query: '#AIRevolution',
    tweetsCount: 45678,
    category: 'Technology',
  },
  {
    id: '2',
    name: 'ChatGPT',
    query: 'ChatGPT',
    tweetsCount: 234567,
    category: 'Technology',
  },
  {
    id: '3',
    name: 'Quantum Computing',
    query: 'Quantum Computing',
    tweetsCount: 12345,
    category: 'Science',
  },
  {
    id: '4',
    name: 'Climate Action',
    query: 'Climate Action',
    tweetsCount: 89012,
    category: 'Environment',
  },
  {
    id: '5',
    name: 'Space Exploration',
    query: 'Space Exploration',
    tweetsCount: 34567,
    category: 'Science',
  },
  {
    id: '6',
    name: '#TechNews',
    query: '#TechNews',
    tweetsCount: 67890,
    category: 'Technology',
  }
];

// Mock follow suggestions
export const mockFollowSuggestions: FollowSuggestion[] = [
  {
    user: mockUsers[2], // Sundar Pichai
    reason: 'Followed by Elon Musk and 5 others',
  },
  {
    user: mockUsers[5], // Demis Hassabis
    reason: 'Followed by OpenAI and 12 others',
  },
  {
    user: mockUsers[3], // Satya Nadella
    reason: 'Popular in your field',
  }
];

// Navigation items
export const navItems = [
  { id: '1', label: 'Home', icon: '🏠', href: '/', isActive: true },
  { id: '2', label: 'Explore', icon: '🔍', href: '/explore', isActive: false },
  { id: '3', label: 'Notifications', icon: '🔔', href: '/notifications', isActive: false, badgeCount: 3 },
  { id: '4', label: 'Messages', icon: '✉️', href: '/messages', isActive: false },
  { id: '5', label: 'Bookmarks', icon: '🔖', href: '/bookmarks', isActive: false },
  { id: '6', label: 'Lists', icon: '📋', href: '/lists', isActive: false },
  { id: '7', label: 'Profile', icon: '👤', href: '/profile', isActive: false },
  { id: '8', label: 'More', icon: '⋯', href: '/more', isActive: false },
];

// Current user (for testing)
export const currentUser: User = {
  id: 'current-user',
  username: 'john_developer',
  displayName: 'John Developer',
  avatar: 'https://unavatar.io/john',
  bio: 'Full-stack developer | AI enthusiast | Building the future',
  location: 'San Francisco, CA',
  website: 'john.dev',
  joinDate: new Date('2020-01-15'),
  followersCount: 1234,
  followingCount: 567,
  tweetsCount: 89,
  verified: false,
};