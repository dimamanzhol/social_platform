'use client';

import { useState } from 'react';
import UserAvatar from '../ui/UserAvatar';

interface ComposeTweetProps {
  onTweet?: (content: string) => void;
  placeholder?: string;
  userAvatar?: string;
  userName?: string;
}

export default function ComposeTweet({
  onTweet,
  placeholder = "What is happening?!",
  userAvatar = "https://unavatar.io/john",
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
    <div className="border-b border-custom transition-all duration-200">
      <div className="p-4">
        <div className="flex space-x-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <UserAvatar
              src={userAvatar}
              alt={userName}
              size="medium"
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
              className={`w-full bg-transparent text-primary placeholder:text-secondary resize-none focus:outline-none transition-all duration-200 ${
                isExpanded ? 'text-xl min-h-[60px]' : 'text-xl h-[24px]'
              }`}
              rows={isExpanded ? 3 : 1}
              maxLength={characterLimit}
            />

            {/* Expanded Actions - Visible when focused or has content */}
            {(isExpanded || content.trim().length > 0) && (
              <div className="mt-4 flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <button
                    className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200 group"
                    title="Add media"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM19 8H5v2h14V8zm0 4H5v2h14v-2z"/>
                    </svg>
                  </button>
                  <button
                    className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200 group"
                    title="Add GIF"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM5 8v10h14V8H5z"/>
                    </svg>
                  </button>
                  <button
                    className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200 group"
                    title="Add poll"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </button>
                  <button
                    className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200 group"
                    title="Add emoji"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                      <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"/>
                    </svg>
                  </button>
                  <button
                    className="text-accent-blue hover:bg-hover p-2 rounded-full transition-colors duration-200 group"
                    title="Schedule"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current group-hover:scale-110 transition-transform">
                      <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"/>
                    </svg>
                  </button>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                  {/* Character Count */}
                  <span className={`text-sm transition-colors duration-200 ${
                    remainingChars < 20
                      ? remainingChars < 0
                        ? 'text-danger-red'
                        : 'text-warning-yellow'
                      : 'text-secondary'
                  }`}>
                    {content.length > 0 && (
                      <span className={remainingChars < 0 ? 'font-medium' : ''}>
                        {remainingChars}
                      </span>
                    )}
                  </span>

                  {/* Post Button */}
                  <button
                    onClick={handleTweet}
                    disabled={!canPost}
                    className={`px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                      canPost
                        ? 'bg-accent-blue hover:bg-accent-hover text-white cursor-pointer transform hover:scale-105'
                        : 'bg-opacity-50 bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {content.length > characterLimit * 0.9 && (
        <div className="h-1 bg-primary">
          <div
            className={`h-full transition-all duration-300 ${
              remainingChars < 0
                ? 'bg-danger-red'
                : remainingChars < 20
                  ? 'bg-warning-yellow'
                  : 'bg-accent-blue'
            }`}
            style={{
              width: `${Math.min((content.length / characterLimit) * 100, 100)}%`
            }}
          />
        </div>
      )}
    </div>
  );
}