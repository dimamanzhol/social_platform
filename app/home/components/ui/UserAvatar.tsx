'use client';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'medium' | 'md' | 'lg' | number;
  className?: string;
}

export default function UserAvatar({ src, alt, size = 'medium', className = '' }: UserAvatarProps) {
  const getSizeClass = () => {
    if (typeof size === 'number') {
      return `w-[${size}px] h-[${size}px]`;
    }

    const sizeClasses = {
      sm: 'w-8 h-8',
      medium: 'w-12 h-12',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    };

    return sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium;
  };

  return (
    <div className={`${getSizeClass()} rounded-full overflow-hidden bg-gray-800 ${className}`}>
      <img
        src={src || `https://unavatar.io/${alt}`}
        alt={alt}
        className="w-full h-full object-cover"
        style={typeof size === 'number' ? { width: size, height: size } : {}}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=1DA1F2&color=fff&size=${typeof size === 'number' ? size * 2 : 80}`;
        }}
      />
    </div>
  );
}