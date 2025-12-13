// User interface for Twitter/X style profiles
export interface User {
  id: string;
  username: string; // @username
  displayName: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate: Date;
  followersCount: number;
  followingCount: number;
  tweetsCount: number;
  verified: boolean;
  pinnedTweetId?: string;
}

// Tweet interface for posts
export interface Tweet {
  id: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
  likesCount: number;
  repostsCount: number;
  repliesCount: number;
  viewsCount: number;
  bookmarksCount: number;
  likedByCurrentUser: boolean;
  repostedByCurrentUser: boolean;
  bookmarkedByCurrentUser: boolean;
  replyToTweetId?: string;
  replyToUser?: User;
  quotedTweetId?: string;
  quotedTweet?: Tweet;
  media?: TweetMedia[];
  poll?: TweetPoll;
  language: string;
  source: string; // e.g., "Twitter Web App", "iPhone"
}

// Media attachments for tweets
export interface TweetMedia {
  id: string;
  type: 'photo' | 'video' | 'gif';
  url: string;
  previewUrl?: string;
  width?: number;
  height?: number;
  duration?: number; // for videos in seconds
  altText?: string;
}

// Poll data structure
export interface TweetPoll {
  id: string;
  question: string;
  options: PollOption[];
  votingEndsAt: Date;
  totalVotes: number;
  currentVoteSelection?: number; // index of selected option
}

export interface PollOption {
  index: number;
  text: string;
  votesCount: number;
}

// Trending topic interface
export interface TrendingTopic {
  id: string;
  name: string;
  query: string;
  tweetsCount: number;
  category?: string;
}

// Who to follow suggestion
export interface FollowSuggestion {
  user: User;
  reason: string; // e.g., "Followed by 5 people you follow"
}

// Navigation item interface
export interface NavItem {
  id: string;
  label: string;
  icon: string; // emoji or icon component name
  href: string;
  isActive?: boolean;
  badgeCount?: number;
}

// Reply thread information
export interface ReplyThread {
  replies: Tweet[];
  totalReplies: number;
  hasMore: boolean;
}

// Search results interface
export interface SearchResults {
  tweets: Tweet[];
  users: User[];
  hasMore: boolean;
  totalResults: number;
}

// User interaction events
export interface TweetInteraction {
  type: 'like' | 'repost' | 'reply' | 'quote' | 'bookmark';
  tweetId: string;
  userId: string;
  timestamp: Date;
}

// Comment interface for threaded comment system
export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  likesCount: number;
  repliesCount: number;
  likedByCurrentUser: boolean;
  replies: Comment[];
  parentCommentId?: string;
  level: number; // nesting level (0 = top-level)
}

// Comment interaction interface
export interface CommentInteraction {
  type: 'like' | 'reply';
  commentId: string;
  userId: string;
  timestamp: Date;
}

// Notification interface (for future implementation)
export interface Notification {
  id: string;
  type: 'like' | 'repost' | 'reply' | 'follow' | 'mention' | 'quote';
  user: User;
  tweet?: Tweet;
  text?: string;
  isRead: boolean;
  createdAt: Date;
}