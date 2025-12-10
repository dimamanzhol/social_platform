'use client';

import { TrendingTopic } from '../../types';

interface TrendingSectionProps {
  trendingTopics: TrendingTopic[];
}

function formatTweetCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return `${(count / 1000).toFixed(0)}K`;
  } else {
    return `${(count / 1000000).toFixed(1)}M`;
  }
}

export default function TrendingSection({ trendingTopics }: TrendingSectionProps) {
  return (
    <div className="bg-secondary rounded-2xl overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-primary">Trends for you</h2>
      </div>

      <div>
        {trendingTopics.slice(0, 6).map((topic, index) => (
          <div
            key={topic.id}
            className="px-4 py-3 hover:bg-hover cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-1 text-secondary text-sm">
                  {topic.category && (
                    <span>{topic.category}</span>
                  )}
                  {!topic.category && index < 3 && (
                    <span>Trending</span>
                  )}
                  {index === 0 && !topic.category && (
                    <span>🔥</span>
                  )}
                  <span>·</span>
                  <span>{formatTweetCount(topic.tweetsCount)} posts</span>
                </div>
                <div className="mt-1">
                  <h3 className="font-bold text-primary hover:underline">
                    {topic.name}
                  </h3>
                </div>
              </div>
              <button className="p-1 rounded-full hover:bg-hover transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-secondary fill-current">
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <a
          href="/trends"
          className="text-accent-blue hover:underline text-sm font-medium"
        >
          Show more
        </a>
      </div>
    </div>
  );
}