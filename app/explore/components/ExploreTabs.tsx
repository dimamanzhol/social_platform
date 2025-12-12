'use client';

import { useState } from 'react';

const tabs = [
  { id: 'for-you', label: 'For you' },
  { id: 'trending', label: 'Trending' },
  { id: 'news', label: 'News' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
];

export default function ExploreTabs() {
  const [activeTab, setActiveTab] = useState('for-you');

  return (
    <div className="flex space-x-8 px-4 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-4 px-1 border-b-2 transition-all duration-200 whitespace-nowrap ${
            activeTab === tab.id
              ? 'border-accent-blue text-primary font-bold'
              : 'border-transparent text-secondary hover:text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}