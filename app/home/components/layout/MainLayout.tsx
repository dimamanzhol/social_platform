'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  mobileBottomNav?: ReactNode;
  children: ReactNode;
}

export default function MainLayout({ leftSidebar, rightSidebar, mobileBottomNav, children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-primary">
      {/* Mobile Bottom Navigation */}
      {mobileBottomNav && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-custom z-50">
          {mobileBottomNav}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar - Hidden on mobile, visible on desktop */}
        {leftSidebar && (
          <div className="hidden lg:flex w-64 xl:w-72 flex-shrink-0 sticky top-0 h-screen border-r border-custom">
            <div className="p-2">
              {leftSidebar}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-custom lg:max-w-2xl pb-16 lg:pb-0">
          <div className="sticky top-0 bg-primary backdrop-blur-md bg-opacity-90 z-10">
            {/* Header will go here */}
          </div>
          {children}
        </div>

        {/* Right Sidebar - Hidden on mobile, visible on desktop */}
        {rightSidebar && (
          <div className="hidden lg:flex w-80 flex-shrink-0 sticky top-0 h-screen">
            <div className="p-4">
              {rightSidebar}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}