'use client';

import { useState } from 'react';
import UserAvatar from '../../home/components/ui/UserAvatar';
import IconButton from '../../home/components/ui/IconButton';

// Mock content data
const contentItems = [
  {
    id: 1,
    type: 'text',
    author: {
      name: 'Tech News',
      username: '@technews',
      avatar: 'https://unavatar.io/technews',
      verified: true
    },
    content: 'Breaking: Major AI breakthrough announced today! Scientists have developed a new model that can understand context better than ever before. 🤖',
    timestamp: '2h',
    likes: 15420,
    reposts: 3421,
    replies: 892,
    category: 'Technology'
  },
  {
    id: 2,
    type: 'image',
    author: {
      name: 'Space Photos',
      username: '@spacephotos',
      avatar: 'https://unavatar.io/space',
      verified: true
    },
    content: 'Stunning image from the James Webb Telescope today. The universe never ceases to amaze! 🌌',
    image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop',
    timestamp: '4h',
    likes: 45678,
    reposts: 8976,
    replies: 2341,
    category: 'Science'
  },
  {
    id: 3,
    type: 'text',
    author: {
      name: 'Sports Center',
      username: '@sportscenter',
      avatar: 'https://unavatar.io/sports',
      verified: true
    },
    content: '🔴 LIVE: Championship finals happening right now! Who are you rooting for? #SportsFinals',
    timestamp: '1h',
    likes: 8934,
    reposts: 1234,
    replies: 567,
    category: 'Sports',
    live: true
  },
  {
    id: 4,
    type: 'video',
    author: {
      name: 'Movie Trailers',
      username: '@movietrailers',
      avatar: 'https://unavatar.io/movies',
      verified: true
    },
    content: 'New trailer just dropped! This might be the biggest movie of the year. 🎬',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    timestamp: '6h',
    likes: 67890,
    reposts: 12456,
    replies: 3456,
    category: 'Entertainment'
  },
  {
    id: 5,
    type: 'text',
    author: {
      name: 'World News',
      username: '@worldnews',
      avatar: 'https://unavatar.io/news',
      verified: true
    },
    content: 'Important updates from around the globe. Stay informed with the latest developments. 📰',
    timestamp: '30m',
    likes: 12345,
    reposts: 2345,
    replies: 678,
    category: 'News'
  },
  {
    id: 6,
    type: 'image',
    author: {
      name: 'Nature Photography',
      username: '@naturepics',
      avatar: 'https://unavatar.io/nature',
      verified: false
    },
    content: 'Captured this beautiful sunset at the beach today. Nature\'s artistry! 🌅',
    image: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=600&h=400&fit=crop',
    timestamp: '3h',
    likes: 23456,
    reposts: 3456,
    replies: 789,
    category: 'Photography'
  }
];

export default function ContentGrid() {
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const handleLike = (itemId: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contentItems.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          isLiked={likedItems.has(item.id)}
          onLike={() => handleLike(item.id)}
        />
      ))}
    </div>
  );
}

interface ContentCardProps {
  item: any;
  isLiked: boolean;
  onLike: () => void;
}

function ContentCard({ item, isLiked, onLike }: ContentCardProps) {
  const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(0)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="bg-secondary rounded-2xl overflow-hidden hover:bg-hover transition-colors duration-200 cursor-pointer">
      {/* Media Content */}
      {(item.type === 'image' || item.type === 'video') && (
        <div className="relative aspect-video bg-gray-800">
          <img
            src={item.image || item.thumbnail}
            alt={item.content}
            className="w-full h-full object-cover"
          />
          {item.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-black ml-1">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
          {item.live && (
            <div className="absolute top-3 left-3 bg-danger-red text-white text-xs px-2 py-1 rounded-full font-medium">
              LIVE
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center space-x-2 mb-2">
          {item.category && (
            <span className="text-accent-blue text-sm font-medium hover:underline cursor-pointer">
              {item.category}
            </span>
          )}
          <span className="text-secondary text-sm">·</span>
          <span className="text-secondary text-sm">{item.timestamp}</span>
        </div>

        {/* Text Content */}
        <p className="text-primary text-sm leading-normal mb-3 line-clamp-3">
          {item.content}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <UserAvatar
              src={item.author.avatar}
              alt={item.author.name}
              size="sm"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-primary text-sm hover:underline cursor-pointer">
                  {item.author.name}
                </span>
                {item.author.verified && (
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-accent-blue fill-current">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                  </svg>
                )}
              </div>
              <span className="text-secondary text-sm">@{item.author.username}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-secondary">
          <IconButton
            icon={
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067C4.902 17.87 1.751 14.24 1.751 10zm16.998 6.22c2.014-1.066 3.418-3.183 3.418-5.61 0-3.516-2.859-6.377-6.379-6.377H9.756c-3.484 0-6.318 2.833-6.318 6.32 0 3.395 2.67 6.18 6.049 6.354l.33.02h.743v2.424l5.47-3.03z"/>
              </svg>
            }
            label="Reply"
            count={item.replies}
            onClick={() => {}}
          />

          <IconButton
            icon={
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L-1.265 9.48l-1.364-1.46L4.5 3.88z M18.5 8v8.45l2.765-1.93 1.364 1.46L18.5 20.12l-4.432-4.14 1.364-1.46 2.765 1.93V8c0-1.1-.896-2-2-2H11V4h5.5c2.209 0 4 1.79 4 4z"/>
              </svg>
            }
            label="Repost"
            count={item.reposts}
            onClick={() => {}}
          />

          <IconButton
            icon={
              isLiked ? (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.362-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.548-.06 3.063.58 3.968 1.81.905-1.23 2.42-1.87 3.968-1.81 1.954.1 3.714 1.22 4.601 3.01.896 1.81.848 4.17-.514 6.67z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.378-2.55-7.028-5.19-8.382-7.67-1.362-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.548-.06 3.063.58 3.968 1.81.905-1.23 2.42-1.87 3.968-1.81 1.954.1 3.714 1.22 4.601 3.01.896 1.81.848 4.17-.514 6.67zM12 20.15c3.6-2.1 5.9-4.32 7.05-6.22.93-1.7.97-3.2.31-4.52-.6-1.22-1.83-2.01-3.18-2.08-1.1-.04-2.16.42-2.86 1.21l-.8.9-.8-.9c-.7-.79-1.76-1.25-2.86-1.21-1.35.07-2.58.86-3.18 2.08-.66 1.32-.62 2.82.31 4.52C6.1 15.83 8.4 18.05 12 20.15z"/>
                </svg>
              )
            }
            label="Like"
            count={item.likes}
            isActive={isLiked}
            onClick={onLike}
          />
        </div>
      </div>
    </div>
  );
}