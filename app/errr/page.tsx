// pages/error.tsx or app/error.tsx
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4">
      <div className="flex flex-col items-center gap-4 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-500">An Error Occurred</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          We encountered an error while fetching data. Please try again or go back to the homepage.
        </p>
        <button
          onClick={() => router.push('/')} // Navigate back to the homepage
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
