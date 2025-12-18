"use client";

import { navItems } from "../../data/mockData";
import { NavItem } from "../../../types";
import { Button } from "../ui/button";
import {
  HomeIcon,
  ExploreIcon,
  NotificationsIcon,
  MessagesIcon,
  BookmarksIcon,
  ProfileIcon,
  MoreIcon,
} from "../ui/IconComponents";

interface NavItemComponentProps {
  item: NavItem;
}

function NavItemComponent({ item }: NavItemComponentProps) {
  const baseClasses =
    "flex items-center space-x-4 p-3 rounded-full transition-all duration-200 hover:bg-hover";
  const activeClasses = item.isActive ? "font-bold" : "font-bold";

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "HomeIcon":
        return <HomeIcon />;
      case "ExploreIcon":
        return <ExploreIcon />;
      case "NotificationsIcon":
        return <NotificationsIcon />;
      case "MessagesIcon":
        return <MessagesIcon />;
      case "BookmarksIcon":
        return <BookmarksIcon />;
      case "ProfileIcon":
        return <ProfileIcon />;
      case "MoreIcon":
        return <MoreIcon />;
      default:
        return <HomeIcon />;
    }
  };

  return (
    <a href={item.href} className={`${baseClasses} ${activeClasses}`}>
      <span className="w-6 h-6 flex items-center justify-center text-primary">
        {getIconComponent(item.icon)}
      </span>
      <span className="text-xl hidden xl:block text-primary font-bold">
        {item.label}
      </span>
      {item.badgeCount && item.badgeCount > 0 && (
        <span className="ml-auto bg-primary text-white text-xs rounded-full px-2 py-1">
          {item.badgeCount}
        </span>
      )}
    </a>
  );
}

export default function NavigationMenu() {
  return (
    <div className="flex flex-col h-full px-2">
      {/* Logo */}
      <div className="p-3 mb-4">
        <svg
          viewBox="0 0 24 24"
          aria-label="X"
          className="w-8 h-8 text-white"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      </div>

  
      {/* Navigation Items */}
      <div className="space-y-1">
        {navItems.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </div>

      {/* Actions Section */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-2 p-3 rounded-full hover:bg-hover transition-all duration-200 cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span className="text-xl hidden xl:block text-primary font-bold">
            Likes
          </span>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="mt-auto p-3 rounded-full hover:bg-hover transition-all duration-200 cursor-pointer">
        <div className="flex items-center space-x-3">
          <img
            src="/avatar.png"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden xl:block flex-1">
            <div className="font-bold text-primary">Dinmukhamed Amanzhol</div>
            <div className="text-secondary text-sm">@dimamanzhol</div>
          </div>
          <div className="hidden xl:block text-secondary">⋯</div>
        </div>
      </div>

      {/* Post Button */}
      <div className="pb-4">
        <Button className="w-full btn-primary rounded-full font-bold py-3">
          Post
        </Button>
      </div>
    </div>
  );
}
