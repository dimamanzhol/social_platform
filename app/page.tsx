'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">𝕏</div>

        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hover:text-gray-300 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition font-medium">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hover:text-gray-300 transition w-full text-left">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition font-medium text-center w-full">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Happening Now
          </h1>
          <h2 className="text-3xl md:text-4xl mb-8 text-gray-300">
            Join X today.
          </h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <SignedOut>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <SignUpButton mode="modal">
                  <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition font-medium text-lg w-full md:w-auto">
                    Create account
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="border border-gray-600 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition font-medium text-lg w-full md:w-auto">
                    Sign in
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => router.push('/home')}
                className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition font-medium text-lg w-full md:w-auto"
              >
                Go to Home
              </button>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-y border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Real-time</h3>
              <p className="text-gray-400">
                See what's happening right now with instant updates
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-400">
                Join conversations and share your thoughts with the world
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Global</h3>
              <p className="text-gray-400">
                Follow what's trending across the globe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 X Clone. Built with Clerk & Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}