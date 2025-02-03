import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as Cricket, User, Lock, Mail } from 'lucide-react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const startAnimation = async () => {
    setTimeout(() => setShowForm(true), 3000);
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center overflow-hidden relative">
      {/* Cricket Stadium Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80')"
        }}
      />

      {/* Ball and Batsman Animation */}
      <AnimatePresence>
        {!showForm && (
          <>
            {/* Dynamic Batsman */}
            <motion.img
              src="src\data\cricket-player-ready-to-hit.png" // Replace with the actual image URL
              alt="Batsman"
              initial={{ x: -100, y: 50, scale: 0.8 }}
              animate={{
                rotate: [-10, 45, -10],
                transition: {
                  duration: 1.5,
                  times: [0, 0.5, 1],
                  repeat: 0,
                },
              }}
              className="absolute left-1/4 bottom-1/3 w-75 h-75"
            />

            {/* Ball */}
            <motion.div
              initial={{ x: -80, y: 100 }}
              animate={{
                x: [-40, 400, 600],
                y: [60, -150, 100],
                scale: [1, 0.8, 1],
                transition: {
                  duration: 5.5,
                  times: [0, 0.5, 1],
                  type: "spring",
                  bounce: 0.5,
                },
              }}
              className="w-8 h-8 rounded-full bg-red-500 absolute"
              style={{
                boxShadow: "0 0 10px rgba(255,255,255,0.8)"
              }}
            />

            {/* "SIX!" Text Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 300, y: -100 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1.5, 0],
                transition: {
                  duration: 2,
                  times: [0, 0.2, 0.8, 1],
                  delay: 1
                }
              }}
              className="absolute text-6xl font-bold text-white"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            >
              SIX!
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10"
          >
            <div className="text-center mb-8">
              <Cricket className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <h1 className="text-3xl font-bold text-gray-800">
                Cricket Fantasy League
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin ? "Welcome back!" : "Join the excitement!"}
              </p>
            </div>

            <form className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
