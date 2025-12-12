'use client';

import { useState, useRef, useEffect } from 'react';
import UserAvatar from '../../home/components/ui/UserAvatar';
import { mockConversations, mockMessages, currentUser } from '../../home/data/mockData';

export default function ConversationView() {
  const [message, setMessage] = useState('');
  const [selectedConversation] = useState(mockConversations[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(
    mockMessages.filter(msg => msg.conversationId === selectedConversation.id)
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: `msg-${Date.now()}`,
        conversationId: selectedConversation.id,
        senderId: 'current-user',
        content: message.trim(),
        timestamp: new Date(),
        isRead: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Conversation Header */}
      <div className="border-b border-custom p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserAvatar
              src={selectedConversation.user.avatar}
              alt={selectedConversation.user.displayName}
              size="md"
            />
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-bold text-primary">
                  {selectedConversation.user.displayName}
                </span>
                {selectedConversation.user.verified && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-accent-blue fill-current">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                  </svg>
                )}
              </div>
              <span className="text-secondary text-sm">@{selectedConversation.user.username}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-hover transition-colors duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-primary">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-hover transition-colors duration-200">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-primary">
                <path d="M3 12c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm9-3c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm9 0c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === 'current-user'} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-custom p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Start a new message"
              className="w-full bg-secondary text-primary placeholder:text-secondary rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent-blue focus:bg-primary transition-all duration-200"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-accent-blue hover:bg-accent-hover disabled:bg-gray-500 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: any;
  isOwn: boolean;
}

function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-accent-blue text-white rounded-2xl rounded-br-sm px-4 py-2">
            <p className="text-sm leading-normal">{message.content}</p>
          </div>
          <div className="flex items-center justify-end mt-1 space-x-2">
            <span className="text-xs text-secondary">
              {formatTime(message.timestamp)}
            </span>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-accent-blue">
              <path d="M8.5 12.5l2.5 2.5 4.5-4.5"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-secondary text-primary rounded-2xl rounded-bl-sm px-4 py-2">
          <p className="text-sm leading-normal">{message.content}</p>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <span className="text-xs text-secondary">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}