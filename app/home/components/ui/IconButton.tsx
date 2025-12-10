'use client';

import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function IconButton({
  icon,
  label,
  count,
  isActive = false,
  onClick,
  className = ''
}: IconButtonProps) {
  const baseClasses = "flex items-center space-x-2 p-2 rounded-full transition-all duration-200 hover:bg-hover group";

  const activeColorClasses = isActive ? "text-accent-blue" : "text-secondary group-hover:text-primary";
  const countClasses = isActive ? "text-accent-blue" : "text-secondary group-hover:text-primary";

  return (
    <button
      className={`${baseClasses} ${activeColorClasses} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="text-xl group-hover:scale-110 transition-transform duration-200">
        {icon}
      </span>
      {count !== undefined && count > 0 && (
        <span className={`text-sm ${countClasses}`}>
          {formatCount(count)}
        </span>
      )}
    </button>
  );
}

function formatCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  } else if (count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else {
    return `${(count / 1000000000).toFixed(1)}B`;
  }
}