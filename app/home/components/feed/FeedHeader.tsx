'use client';

export default function FeedHeader() {
  return (
    <div className="flex">
      <button className="flex-1 text-primary font-bold hover:bg-hover transition-colors duration-200 relative focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0">
        <span className="py-4 block">For you</span>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></div>
      </button>
      <button className="flex-1 text-secondary hover:bg-hover transition-colors duration-200 relative focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0">
        <span className="py-4 block">Following</span>
      </button>
    </div>
  );
}