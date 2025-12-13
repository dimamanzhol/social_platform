'use client';

import { useState } from 'react';

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'replies', label: 'Replies' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'media', label: 'Media' },
    { id: 'likes', label: 'Likes' },
  ];

  return (
    <div className="border-b border-custom">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 relative hover:bg-hover transition-colors duration-200 ${
              activeTab === tab.id ? 'font-bold' : ''
            }`}
          >
            <span className="text-sm text-primary">{tab.label}</span>

            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-blue rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}