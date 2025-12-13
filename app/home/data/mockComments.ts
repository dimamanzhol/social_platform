import { Comment } from '../../types';

// Mock users for comments
const mockCommentUsers = [
  {
    id: 'user-1',
    username: 'alex_chen',
    displayName: 'Alex Chen',
    avatar: 'https://unavatar.io/alex',
    bio: 'Tech enthusiast | Coffee lover',
    location: 'San Francisco',
    website: 'alex.dev',
    joinDate: new Date('2020-03-15'),
    followersCount: 1234,
    followingCount: 567,
    tweetsCount: 2341,
    verified: false
  },
  {
    id: 'user-2',
    username: 'sarah_wilson',
    displayName: 'Sarah Wilson',
    avatar: 'https://unavatar.io/sarah',
    bio: 'Product Manager | Design Thinker',
    location: 'New York',
    website: 'sarahwilson.com',
    joinDate: new Date('2019-07-22'),
    followersCount: 3456,
    followingCount: 890,
    tweetsCount: 5678,
    verified: true
  },
  {
    id: 'user-3',
    username: 'mike_jones',
    displayName: 'Mike Jones',
    avatar: 'https://unavatar.io/mike',
    bio: 'Full-stack developer | Open source contributor',
    location: 'Austin',
    website: 'mikejones.dev',
    joinDate: new Date('2021-01-10'),
    followersCount: 890,
    followingCount: 234,
    tweetsCount: 1234,
    verified: false
  },
  {
    id: 'user-4',
    username: 'emma_davis',
    displayName: 'Emma Davis',
    avatar: 'https://unavatar.io/emma',
    bio: 'UX Designer | Creative thinker',
    location: 'Seattle',
    website: 'emma.design',
    joinDate: new Date('2020-11-05'),
    followersCount: 2345,
    followingCount: 456,
    tweetsCount: 3456,
    verified: true
  },
  {
    id: 'user-5',
    username: 'david_lee',
    displayName: 'David Lee',
    avatar: 'https://unavatar.io/david',
    bio: 'Data Scientist | ML Engineer',
    location: 'Boston',
    website: 'davidlee.ai',
    joinDate: new Date('2019-09-12'),
    followersCount: 4567,
    followingCount: 678,
    tweetsCount: 7890,
    verified: false
  }
];

// Mock nested comments
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    author: mockCommentUsers[0], // Alex Chen
    content: 'This is a really interesting perspective! I\'ve been thinking about the implications of this technology for a while now. The potential applications are endless, but we also need to consider the ethical implications.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likesCount: 24,
    repliesCount: 3,
    likedByCurrentUser: false,
    level: 0,
    replies: [
      {
        id: 'reply-1-1',
        author: mockCommentUsers[1], // Sarah Wilson
        content: 'Completely agree! The ethical considerations are crucial. We need to think about how this affects different communities and ensure we\'re building inclusive technology.',
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
        likesCount: 12,
        repliesCount: 2,
        likedByCurrentUser: true,
        level: 1,
        parentCommentId: 'comment-1',
        replies: [
          {
            id: 'reply-1-1-1',
            author: mockCommentUsers[2], // Mike Jones
            content: 'Inclusivity should be at the forefront of development. I\'ve seen too many technologies fail because they didn\'t consider diverse user needs from the start.',
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            likesCount: 8,
            repliesCount: 1,
            likedByCurrentUser: false,
            level: 2,
            parentCommentId: 'reply-1-1',
            replies: [
              {
                id: 'reply-1-1-1-1',
                author: mockCommentUsers[3], // Emma Davis
                content: 'Exactly! User research and testing with diverse groups should be non-negotiable in the development process. It\'s not just about accessibility, it\'s about creating better products for everyone.',
                createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                likesCount: 15,
                repliesCount: 0,
                likedByCurrentUser: true,
                level: 3,
                parentCommentId: 'reply-1-1-1',
                replies: []
              }
            ]
          },
          {
            id: 'reply-1-1-2',
            author: mockCommentUsers[4], // David Lee
            content: 'From a data perspective, we also need to be careful about algorithmic bias. The training data we use can have real-world consequences.',
            createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
            likesCount: 6,
            repliesCount: 0,
            likedByCurrentUser: false,
            level: 2,
            parentCommentId: 'reply-1-1',
            replies: []
          }
        ]
      },
      {
        id: 'reply-1-2',
        author: mockCommentUsers[2], // Mike Jones
        content: 'The implementation challenges are also significant. We need better tools and frameworks to help developers build responsibly.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        likesCount: 4,
        repliesCount: 0,
        likedByCurrentUser: false,
        level: 1,
        parentCommentId: 'comment-1',
        replies: []
      }
    ]
  },
  {
    id: 'comment-2',
    author: mockCommentUsers[1], // Sarah Wilson
    content: 'I\'ve been working on something similar in my current project. The key is finding the right balance between innovation and practicality. Have you considered how this scales?',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likesCount: 18,
    repliesCount: 1,
    likedByCurrentUser: false,
    level: 0,
    replies: [
      {
        id: 'reply-2-1',
        author: mockCommentUsers[3], // Emma Davis
        content: 'Scaling is definitely a major concern. We\'ve been testing with progressively larger datasets and the performance implications are non-trivial. Microservices architecture has been helping us manage the complexity.',
        createdAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
        likesCount: 9,
        repliesCount: 0,
        likedByCurrentUser: false,
        level: 1,
        parentCommentId: 'comment-2',
        replies: []
      }
    ]
  },
  {
    id: 'comment-3',
    author: mockCommentUsers[4], // David Lee
    content: 'Great analysis! I\'d love to see more data backing up these claims. Have you published any papers or technical documentation on this approach? I\'m particularly interested in the statistical methods you used.',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likesCount: 7,
    repliesCount: 0,
    likedByCurrentUser: true,
    level: 0,
    replies: []
  },
  {
    id: 'comment-4',
    author: mockCommentUsers[2], // Mike Jones
    content: 'This reminds me of the discussions we had at the conference last month. The community is really moving in this direction. I\'m excited to see where this goes in the next few years.',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likesCount: 11,
    repliesCount: 2,
    likedByCurrentUser: false,
    level: 0,
    replies: [
      {
        id: 'reply-4-1',
        author: mockCommentUsers[0], // Alex Chen
        content: 'The conference was amazing! I learned so much from the sessions and networking. It\'s great to see so many people passionate about pushing the boundaries of what\'s possible.',
        createdAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000), // 4.5 hours ago
        likesCount: 5,
        repliesCount: 0,
        likedByCurrentUser: false,
        level: 1,
        parentCommentId: 'comment-4',
        replies: []
      },
      {
        id: 'reply-4-2',
        author: mockCommentUsers[1], // Sarah Wilson
        content: 'I agree! The energy and ideas being shared were incredible. Looking forward to next year\'s event already!',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        likesCount: 3,
        repliesCount: 0,
        likedByCurrentUser: false,
        level: 1,
        parentCommentId: 'comment-4',
        replies: []
      }
    ]
  },
  {
    id: 'comment-5',
    author: mockCommentUsers[3], // Emma Davis
    content: 'Quick question: How do you handle edge cases in your implementation? We\'ve been struggling with some specific scenarios that don\'t fit the standard patterns.',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    likesCount: 2,
    repliesCount: 0,
    likedByCurrentUser: false,
    level: 0,
    replies: []
  }
];

// Current user for testing
export const currentUser = {
  id: 'current-user',
  avatar: 'https://unavatar.io/john',
  displayName: 'John Developer'
};