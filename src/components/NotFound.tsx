import React from 'react';
import { useTheme } from './ui/theme-provider';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
    const { theme } = useTheme();
    return (
        <div className={`flex flex-col items-center justify-center h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg mb-6">The page you are looking for does not exist.</p>
            <button 
                className={`flex items-center px-4 py-2 text-white rounded transition duration-300 ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                onClick={() => window.location.href = '/home'}
            >
                <Home className="mr-2" />
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;