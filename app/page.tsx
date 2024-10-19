"use client";
import React, { useEffect, useState } from 'react';
import Maini from '@/app/component/Maini';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GitHubProfile {
  avatar_url: string;
  name: string;
  login: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const Page: React.FC = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState('mahak24342');
  const router = useRouter();

  // Function to fetch GitHub profile data
  const fetchGitHubProfile = async (username: string) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error('User not found');
      }
      const data: GitHubProfile = await res.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
       // Navigate to the error page when an error occurs
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch for default user
  useEffect(() => {
    fetchGitHubProfile(user);
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGitHubProfile(user);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300">Fetching GitHub profile...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="p-4 gap-10 flex flex-col">
        <section className="flex justify-between gap-3">
          <h2 className="text-xl font-semibold">GitHub</h2>
          <Maini />
        </section>

        <section className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden w-full">
            <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-700">
              <FiSearch size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="p-2 w-full bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </section>

        {profile && (
          <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="flex gap-4 items-start">
              <Image
                src={profile.avatar_url}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col gap-2 sm:w-full">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {profile.name}
                </h1>
                <Link
                  href={profile.html_url}
                  className="text-sm text-blue-500 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{profile.login}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Joined {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">{profile.bio || 'No bio available.'}</p>
            </div>

            <div className="flex justify-between mt-5 gap-3 min-h-[50px]">
              <div className="flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition duration-300">
                <p className="text-sm text-gray-600 dark:text-gray-400">Repos</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {profile.public_repos}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition duration-300">
                <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {profile.followers}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition duration-300">
                <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {profile.following}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
