import { supabase, DatabaseProfile } from '../supabase';

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  followersCount: number;
  followingCount: number;
  tweetsCount: number;
  verified: boolean;
  is_following?: boolean;
}

export interface UpdateProfileData {
  username?: string;
  display_name?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar_url?: string;
  banner_url?: string;
}

export async function getUserProfile(userId: string): Promise<{ error: string | null; data: UserProfile | null }> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        return await createProfileFromClerk(userId);
      }
      return { error: error.message, data: null };
    }

    const userProfile: UserProfile = {
      id: data.id,
      username: data.username,
      displayName: data.display_name,
      avatar: data.avatar_url,
      avatar_url: data.avatar_url,
      bio: data.bio,
      location: data.location,
      website: data.website,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      tweetsCount: data.tweets_count,
      verified: data.verified,
    };

    return { error: null, data: userProfile };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user profile';
    return { error: errorMessage, data: null };
  }
}

export async function getProfileByUsername(username: string): Promise<{ error: string | null; data: UserProfile | null }> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      return { error: error.message, data: null };
    }

    const userProfile: UserProfile = {
      id: data.id,
      username: data.username,
      displayName: data.display_name,
      avatar: data.avatar_url,
      avatar_url: data.avatar_url,
      bio: data.bio,
      location: data.location,
      website: data.website,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      tweetsCount: data.tweets_count,
      verified: data.verified,
    };

    return { error: null, data: userProfile };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user profile';
    return { error: errorMessage, data: null };
  }
}

export async function updateUserProfile(userId: string, data: UpdateProfileData): Promise<{ error: string | null; data: UserProfile | null }> {
  try {
    const { data: updatedData, error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { error: error.message, data: null };
    }

    const userProfile: UserProfile = {
      id: updatedData.id,
      username: updatedData.username,
      displayName: updatedData.display_name,
      avatar: updatedData.avatar_url,
      avatar_url: updatedData.avatar_url,
      bio: updatedData.bio,
      location: updatedData.location,
      website: updatedData.website,
      followersCount: updatedData.followers_count,
      followingCount: updatedData.following_count,
      tweetsCount: updatedData.tweets_count,
      verified: updatedData.verified,
    };

    return { error: null, data: userProfile };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to update user profile';
    return { error: errorMessage, data: null };
  }
}

// Fallback function to create profile from Clerk user data
async function createProfileFromClerk(userId: string): Promise<{ error: string | null; data: UserProfile | null }> {
  try {
    // This would typically be handled by the webhook, but as a fallback
    // we can create a basic profile
    const profileData = {
      id: userId,
      username: `user_${userId.slice(-8)}`,
      display_name: 'User',
      avatar_url: null,
      bio: null,
      location: null,
      website: null,
      banner_url: null,
      followers_count: 0,
      following_count: 0,
      tweets_count: 0,
      verified: false,
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();

    if (error) {
      return { error: error.message, data: null };
    }

    const userProfile: UserProfile = {
      id: data.id,
      username: data.username,
      displayName: data.display_name,
      avatar: data.avatar_url,
      avatar_url: data.avatar_url,
      bio: data.bio,
      location: data.location,
      website: data.website,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      tweetsCount: data.tweets_count,
      verified: data.verified,
    };

    return { error: null, data: userProfile };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create user profile';
    return { error: errorMessage, data: null };
  }
}