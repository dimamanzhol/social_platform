'use client';

export default function FeedHeader() {
  return (
    <div className="sticky top-0 bg-primary backdrop-blur-md bg-opacity-90 z-10 border-b border-custom">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary px-4 py-3 flex-1">
          Home
        </h1>
        <div className="flex items-center space-x-1 px-4">
          <button className="p-2 rounded-full hover:bg-hover transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary fill-current">
              <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.588.477.7l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.618-2.192c.287-.112.477-.39.477-.7s-.19-.588-.477-.7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex">
        <button className="flex-1 text-primary font-bold hover:bg-hover transition-colors duration-200 relative">
          <span className="py-4 block">For you</span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"></div>
        </button>
        <button className="flex-1 text-secondary hover:bg-hover transition-colors duration-200 relative">
          <span className="py-4 block">Following</span>
        </button>
      </div>
    </div>
  );
}