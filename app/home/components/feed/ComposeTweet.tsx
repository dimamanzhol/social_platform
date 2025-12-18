'use client';

import { useState } from 'react';

interface ComposeTweetProps {
  onTweet?: (content: string) => void;
  placeholder?: string;
  userAvatar?: string;
  userName?: string;
}

export default function ComposeTweet({
  onTweet,
  placeholder = "What is happening?!",
  userAvatar = "/avatar.png",
  userName = "John Developer"
}: ComposeTweetProps) {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const characterLimit = 280;
  const remainingChars = characterLimit - content.length;
  const canPost = content.trim().length > 0 && content.length <= characterLimit;

  const handleFocus = () => {
    setIsFocused(true);
    setIsExpanded(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Only collapse if content is empty and not clicking on action buttons
    if (content.trim() === '' && !e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsExpanded(false);
    }
    setIsFocused(false);
  };

  const handleTweet = () => {
    if (canPost && onTweet) {
      onTweet(content.trim());
      setContent('');
      setIsExpanded(false);
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey && canPost) {
      e.preventDefault();
      handleTweet();
    }
  };

  return (
    <div>
      <div className={`${isExpanded ? 'p-4' : 'py-3 px-4'}`}>
        <div className="flex space-x-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <img
              src="/avatar.png"
              alt={userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {/* Tweet Content */}
          <div className="flex-1 min-w-0">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-transparent text-primary placeholder:text-secondary resize-none focus:outline-none text-xl leading-relaxed"
              rows={isExpanded ? 4 : 1}
              maxLength={characterLimit}
            />

            {/* Post Button - Only show when focused or has content */}
            {(isExpanded || content.trim().length > 0) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleTweet}
                  disabled={!canPost}
                  className={`px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                    canPost
                      ? 'bg-accent-blue hover:bg-accent-hover text-white cursor-pointer'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}