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
      <div className="space-y-1 mb-4">
        {navItems.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </div>

      {/* Action Button */}
      <div className="flex items-start gap-2 mb-4">
        <Button className="flex-1 btn-primary rounded-full font-bold">
          Post
        </Button>
        <Button size="icon" aria-label="Quick post" className="btn-primary rounded-full">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </Button>
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
    </div>
  );
}
