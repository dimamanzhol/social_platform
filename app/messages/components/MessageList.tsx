'use client';

import { useState } from 'react';
import UserAvatar from '../../home/components/ui/UserAvatar';
import { mockConversations } from '../../home/data/mockData';

export default function MessageList() {
  const [selectedConversation, setSelectedConversation] = useState('1');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-custom p-4">
        <h2 className="text-xl font-bold text-primary">Messages</h2>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-custom">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Direct Messages"
            className="w-full bg-secondary text-primary placeholder:text-secondary rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:bg-primary transition-all duration-200"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {mockConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation.id)}
            className={`flex items-start space-x-3 p-4 hover:bg-hover cursor-pointer transition-colors duration-200 ${
              selectedConversation === conversation.id ? 'bg-hover' : ''
            }`}
          >
            {/* User Avatar */}
            <div className="flex-shrink-0">
              <UserAvatar
                src={conversation.user.avatar}
                alt={conversation.user.displayName}
                size="md"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-primary hover:underline">
                    {conversation.user.displayName}
                  </span>
                  {conversation.user.verified && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-blue fill-current">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </svg>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-secondary text-sm">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                  {!conversation.lastMessage.isRead && (
                    <div className="w-2 h-2 bg-accent-blue rounded-full"></div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className={`text-sm line-clamp-2 ${
                  conversation.lastMessage.isRead ? 'text-secondary' : 'text-primary font-medium'
                }`}>
                  {conversation.lastMessage.content}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="bg-accent-blue text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}