import React from 'react'
import { useTheme } from 'next-themes'
import { LuMoonStar } from 'react-icons/lu'
import { IoSunnyOutline } from 'react-icons/io5'

const Maini = () => {
  const { resolvedTheme, setTheme } = useTheme()

  function toggleDark() {
    if (resolvedTheme === 'light') setTheme('dark')
    if (resolvedTheme === 'dark') setTheme('light')
  }

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-2 bg-gray-100 dark:bg-gray-400 p-2 rounded-full shadow-lg transition-colors duration-300">
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {resolvedTheme === 'light' ? 'LIGHT' : 'DARK'} MODE
      </p>
      <button 
        onClick={toggleDark}
        className={`p-2 rounded-full bg-gray-200 dark:bg-gray-200 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform duration-500 transform ${resolvedTheme === 'light' ? 'translate-x-0' : '-translate-x-2'}`}
        aria-label="Toggle Theme"
      >
        {resolvedTheme === 'light' ? <LuMoonStar size={20} /> : <IoSunnyOutline size={20} />}
      </button>
    </div>
  )
}

export default Maini
