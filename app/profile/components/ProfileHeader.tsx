'use client';

import { User } from '../../../types';
import UserAvatar from '../../home/components/ui/UserAvatar';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <div className="border-b border-custom">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="px-4 pb-4">
        {/* Profile Picture */}
        <div className="-mt-16 mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-primary bg-primary">
            <UserAvatar
              src={user.avatar}
              alt={user.displayName}
              size="128"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 border border-custom rounded-full text-primary hover:bg-hover transition-colors duration-200 mr-2">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-accent-blue text-white rounded-full hover:bg-accent-hover transition-colors duration-200">
            Follow
          </button>
        </div>

        {/* User Info */}
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-1">
            <h1 className="text-xl font-bold text-primary">
              {user.displayName}
            </h1>
            {user.verified && (
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-blue" aria-label="Verified account">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
              </svg>
            )}
          </div>

          <div className="text-secondary mb-4">
            @{user.username}
          </div>

          {user.bio && (
            <p className="text-primary mb-4">
              {user.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-secondary text-sm mb-4">
            {user.location && (
              <div className="flex items-center space-x-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
                </svg>
                <span>{user.location}</span>
              </div>
            )}

            {user.website && (
              <div className="flex items-center space-x-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.612-1.224 7.332 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.803.593-1.327 1.464-1.476 2.45-.15.99.098 1.975.69 2.778.498.675 1.187 1.15 1.992 1.34.45.116.72.572.603 1.023-.098.38-.45.64-.84.64z"/>
                </svg>
                <a
                  href={user.website}
                  className="text-accent-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </div>
            )}

            <div className="flex items-center space-x-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M7 4V3c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1h4c.55 0 1 .45 1 1s-.45 1-1 1h-1v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H3c-.55 0-1-.45-1-1s.45-1 1-1h4zM9 3v1h6V3H9zm9 3H6v13h12V6z"/>
              </svg>
              <span>Joined {formatJoinDate(user.joinDate)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-4 text-primary">
            <span>
              <span className="font-bold">{formatNumber(user.tweetsCount)}</span>
              {' '}Posts
            </span>
            <span>
              <span className="font-bold">{formatNumber(user.followingCount)}</span>
              {' '}Following
            </span>
            <span>
              <span className="font-bold">{formatNumber(user.followersCount)}</span>
              {' '}Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}