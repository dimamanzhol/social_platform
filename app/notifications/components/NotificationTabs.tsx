'use client';

import { useState } from 'react';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'verified', label: 'Verified' },
  { id: 'mentions', label: 'Mentions' },
];

export default function NotificationTabs() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex space-x-8 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-4 border-b-2 transition-all duration-200 ${
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