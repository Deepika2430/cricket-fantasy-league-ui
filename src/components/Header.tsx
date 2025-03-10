import { ModeToggle } from "./ui/mode-toogle";
import { useTheme } from "./ui/theme-provider";
import { SidebarTrigger } from "./ui/sidebar";
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Signout from './Signout';
import { useState } from 'react';

export function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = () => {
    const token = Cookies.get('authToken');
    console.log(token);
    if (token) {
      Cookies.remove('authToken');
      Cookies.remove('role');
    }
    navigate('/login');
  };

  const confirmSignOut = () => {
    setShowDialog(true);
  };

  const handleDialogConfirm = () => {
    handleSignOut();
    setShowDialog(false);
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  return (
    <header
      className={`flex items-center justify-between h-16 p-4 transition-colors duration-300 z-50 ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
    >
      <div className="flex items-center gap-x-4">
        <SidebarTrigger className={`left-0 ${theme === "dark" ? "text-white" : "text-black"}`} />
        <a href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6_t3ve2CECe9DUpoG7xdyh5xYDFP6B8kJQ&s"
            alt="Logo"
            className="h-10 border-2 border-gray-200 rounded-full"
          />
        </a>
        <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>Cricket Fantasy League</h1>
      </div>
      <div className="flex items-center">
        <ModeToggle />
        <div className="relative"
             onMouseEnter={() => setShowProfileMenu(true)}
             onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button
            className={`ml-4 flex items-center p-2 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}
          >
            <User className="w-6 h-6" />
          </button>
          {showProfileMenu && (
            <div
            className={`absolute right-5 w-auto p-2  border-white rounded-lg shadow-lg
                        inline-flex items-center whitespace-nowrap
                        ${theme === "dark" ? "text-white bg-gray-900" : "bg-white text-black"}`}
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button
              onClick={confirmSignOut}
              className={`text-sm pr-4 py-2 p-2
                          ${theme === "dark" ? "hover:bg-gray-1000 bg-gray-900" : "hover:bg-gray-200 hover:px-3"}`}
            >
              Sign Out
            </button>
          </div>


          )}
        </div>
      </div>
      <Signout
        showDialog={showDialog}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </header>
  );
}
