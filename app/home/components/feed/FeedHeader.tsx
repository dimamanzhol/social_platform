'use client';

interface FeedHeaderProps {
  activeTab: 'foryou' | 'following';
  onTabChange: (tab: 'foryou' | 'following') => void;
}

export default function FeedHeader({ activeTab, onTabChange }: FeedHeaderProps) {
  return (
    <div className="flex">
      <button
        className="flex-1 text-primary font-bold hover:bg-hover transition-colors duration-200 relative"
        onClick={() => onTabChange('foryou')}
      >
        <span className="py-4 block">For you</span>
        {activeTab === 'foryou' && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></div>
        )}
      </button>
      <button
        className="flex-1 text-secondary hover:bg-hover transition-colors duration-200 relative"
        onClick={() => onTabChange('following')}
      >
        <span className="py-4 block">Following</span>
        {activeTab === 'following' && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></div>
        )}
      </button>
    </div>
  );
}