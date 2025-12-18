import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface DatabaseProfile {
  id: string
  username: string
  display_name: string
  bio?: string
  location?: string
  website?: string
  avatar_url?: string
  banner_url?: string
  followers_count: number
  following_count: number
  tweets_count: number
  verified: boolean
  created_at: string
  updated_at: string
}

export interface DatabaseTweet {
  id: string
  user_id: string
  content: string
  reply_to_tweet_id?: string
  reply_to_user_id?: string
  quoted_tweet_id?: string
  likes_count: number
  reposts_count: number
  replies_count: number
  views_count: number
  bookmarks_count: number
  language: string
  source: string
  created_at: string
  updated_at: string
}

export interface DatabaseComment {
  id: string
  user_id: string
  tweet_id: string
  content: string
  parent_comment_id?: string
  likes_count: number
  replies_count: number
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: DatabaseProfile
        Insert: Omit<DatabaseProfile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<DatabaseProfile>
      }
      tweets: {
        Row: DatabaseTweet
        Insert: Omit<DatabaseTweet, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'reposts_count' | 'replies_count' | 'views_count' | 'bookmarks_count'>
        Update: Partial<DatabaseTweet>
      }
      comments: {
        Row: DatabaseComment
        Insert: Omit<DatabaseComment, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'replies_count'>
        Update: Partial<DatabaseComment>
      }
      tweet_likes: {
        Row: { id: string; user_id: string; tweet_id: string; created_at: string }
        Insert: { user_id: string; tweet_id: string }
        Update: never
      }
      reposts: {
        Row: { id: string; user_id: string; tweet_id: string; created_at: string }
        Insert: { user_id: string; tweet_id: string }
        Update: never
      }
      bookmarks: {
        Row: { id: string; user_id: string; tweet_id: string; created_at: string }
        Insert: { user_id: string; tweet_id: string }
        Update: never
      }
      follows: {
        Row: { id: string; follower_id: string; following_id: string; created_at: string }
        Insert: { follower_id: string; following_id: string }
        Update: never
      }
      comment_likes: {
        Row: { id: string; user_id: string; comment_id: string; created_at: string }
        Insert: { user_id: string; comment_id: string }
        Update: never
      }
    }
  }
}