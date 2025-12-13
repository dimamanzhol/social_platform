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
    <img
      src={src}
      alt={alt}
      className={`${getSizeClass()} rounded-full object-cover ${className}`}
      style={typeof size === 'number' ? { width: size, height: size } : {}}
    />
  );
}