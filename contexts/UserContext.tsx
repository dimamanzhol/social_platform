'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserProfile } from '../lib/api/user'
import { getUserProfile } from '../lib/api/user'

interface UserContextType {
  userProfile: UserProfile | null
  loading: boolean
  error: string | null
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserProfile = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user, isLoaded: clerkLoaded } = useUser()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserProfile = async () => {
    if (!user) {
      setUserProfile(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await getUserProfile(user.id)

      if (error) {
        setError(error)
        setUserProfile(null)
      } else {
        setUserProfile(data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user profile'
      setError(errorMessage)
      setUserProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clerkLoaded) {
      fetchUserProfile()
    }
  }, [user, clerkLoaded])

  const refreshProfile = async () => {
    await fetchUserProfile()
  }

  const value: UserContextType = {
    userProfile,
    loading,
    error,
    refreshProfile,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}