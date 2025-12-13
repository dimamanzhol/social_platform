'use client';

import { navItems } from "../../data/mockData";
import { NavItem } from "../../../types";
import { useRouter, usePathname } from 'next/navigation';
import {
  HomeIcon,
  ExploreIcon,
  NotificationsIcon,
  MessagesIcon,
  BookmarksIcon,
  ProfileIcon,
} from "../ui/IconComponents";

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // Mobile nav items - simplified version for bottom nav
  const mobileNavItems: NavItem[] = [
    { id: '1', label: 'Home', icon: 'HomeIcon', href: '/home', isActive: pathname === '/home' },
    { id: '2', label: 'Explore', icon: 'ExploreIcon', href: '/explore', isActive: pathname === '/explore' },
    { id: '3', label: 'Notifications', icon: 'NotificationsIcon', href: '/notifications', isActive: pathname === '/notifications', badgeCount: 3 },
    { id: '4', label: 'Messages', icon: 'MessagesIcon', href: '/messages', isActive: pathname === '/messages' },
  ];

  const getIconComponent = (iconName: string, isActive: boolean) => {
    const iconClass = isActive ? "text-accent-blue" : "text-secondary";

    switch (iconName) {
      case "HomeIcon":
        return <HomeIcon className={iconClass} />;
      case "ExploreIcon":
        return <ExploreIcon className={iconClass} />;
      case "NotificationsIcon":
        return <NotificationsIcon className={iconClass} />;
      case "MessagesIcon":
        return <MessagesIcon className={iconClass} />;
      case "BookmarksIcon":
        return <BookmarksIcon className={iconClass} />;
      case "ProfileIcon":
        return <ProfileIcon className={iconClass} />;
      default:
        return <HomeIcon className={iconClass} />;
    }
  };

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex items-center justify-around py-2">
      {mobileNavItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.href)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 relative ${
            item.isActive ? 'text-accent-blue' : 'text-secondary hover:text-primary'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {getIconComponent(item.icon, item.isActive || false)}
          </div>
          <span className="text-xs mt-1">{item.label}</span>

          {item.badgeCount && item.badgeCount > 0 && (
            <span className="absolute top-1 right-2 bg-accent-blue text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
              {item.badgeCount > 9 ? '9+' : item.badgeCount}
            </span>
          )}
        </button>
      ))}

      {/* Post Button - Mobile */}
      <button
        onClick={() => router.push('/home')}
        className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200"
      >
        <div className="w-6 h-6 flex items-center justify-center bg-accent-blue rounded-full">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </div>
        <span className="text-xs mt-1">Post</span>
      </button>
    </div>
  );
}