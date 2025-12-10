'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  children: ReactNode;
}

export default function MainLayout({ leftSidebar, rightSidebar, children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        {leftSidebar && (
          <div className="w-64 xl:w-72 flex-shrink-0 sticky top-0 h-screen border-r border-custom">
            <div className="p-2">
              {leftSidebar}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 max-w-2xl border-x border-custom">
          <div className="sticky top-0 bg-primary backdrop-blur-md bg-opacity-90 z-10">
            {/* Header will go here */}
          </div>
          {children}
        </div>

        {/* Right Sidebar */}
        {rightSidebar && (
          <div className="w-80 flex-shrink-0 sticky top-0 h-screen hidden lg:block">
            <div className="p-4">
              {rightSidebar}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}