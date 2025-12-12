type CommentProps = {
  size?: string;
  className?: string;
};

export const Comment = ({ size = "20", className = "" }: CommentProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Z"/>
  </svg>
);

type RepostProps = {
  size?: string;
  className?: string;
};

export const Repost = ({ size = "20", className = "" }: RepostProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" className={className}>
    <path fill="currentColor" d="M5 4a2 2 0 0 0-2 2v6H0l4 4l4-4H5V6h7l2-2H5zm10 4h-3l4-4l4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"/>
  </svg>
);

type LikeProps = {
  filled?: boolean;
  size?: string;
  className?: string;
};

export const Like = ({ filled = false, size = "20", className = "" }: LikeProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
    {filled ? (
      <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    ) : (
      <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    )}
  </svg>
);

type ShareProps = {
  size?: string;
  className?: string;
};

export const Share = ({ size = "20", className = "" }: ShareProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M18.5 10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5h1.5v5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V8.38l-1.647 1.53-1.706-1.82 4.603-4.3c.38-.36.87-.56 1.38-.56s1 .2 1.38.57l5.57 5.21c.58.54.84 1.33.66 2.09l-1.34 5.34c-.19.75-.73 1.33-1.46 1.56l-4.87 1.54c-.27.08-.55.12-.83.12-.59 0-1.16-.19-1.62-.54l-3.3-2.49c-.58-.44-.92-1.13-.92-1.86V7.5c0-.69.32-1.32.82-1.72L3.61 3.79z"/>
  </svg>
);

type BookmarkProps = {
  filled?: boolean;
  size?: string;
  className?: string;
};

export const Bookmark = ({ filled = false, size = "20", className = "" }: BookmarkProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
    {filled ? (
      <path fill="currentColor" d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
    ) : (
      <path fill="currentColor" d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"/>
    )}
  </svg>
);