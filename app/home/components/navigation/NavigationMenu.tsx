'use client';

import { navItems } from '../../data/mockData';
import { NavItem } from '../../types';

interface NavItemComponentProps {
  item: NavItem;
}

function NavItemComponent({ item }: NavItemComponentProps) {
  const baseClasses = "flex items-center space-x-4 p-3 rounded-full transition-all duration-200 hover:bg-hover";
  const activeClasses = item.isActive ? "font-bold" : "font-normal";

  return (
    <a
      href={item.href}
      className={`${baseClasses} ${activeClasses}`}
    >
      <span className="text-xl">{item.icon}</span>
      <span className="text-xl hidden xl:block">{item.label}</span>
      {item.badgeCount && item.badgeCount > 0 && (
        <span className="ml-auto bg-accent-blue text-white text-xs rounded-full px-2 py-1">
          {item.badgeCount}
        </span>
      )}
    </a>
  );
}

export default function NavigationMenu() {
  return (
    <div className="flex flex-col space-y-2">
      {/* Logo */}
      <div className="p-3 mb-4">
        <svg viewBox="0 0 24 24" aria-label="X" className="w-8 h-8" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      </div>

      {/* Navigation Items */}
      {navItems.map((item) => (
        <NavItemComponent key={item.id} item={item} />
      ))}

      {/* Post Button */}
      <button className="mt-4 bg-accent-blue hover:bg-accent-hover text-white rounded-full py-3 px-8 font-bold transition-all duration-200 transform hover:scale-105 xl:w-full xl:py-4">
        <span className="xl:hidden">📝</span>
        <span className="hidden xl:block">Post</span>
      </button>

      {/* User Profile Section */}
      <div className="mt-auto mb-4 p-3 rounded-full hover:bg-hover transition-all duration-200 cursor-pointer">
        <div className="flex items-center space-x-3">
          <img
            src="https://unavatar.io/john"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden xl:block flex-1">
            <div className="font-bold text-primary">John Developer</div>
            <div className="text-secondary">@john_developer</div>
          </div>
          <div className="hidden xl:block text-secondary">⋯</div>
        </div>
      </div>
    </div>
  );
}