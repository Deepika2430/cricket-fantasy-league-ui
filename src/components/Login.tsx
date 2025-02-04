import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as Cricket, User, Lock, Mail } from 'lucide-react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const startAnimation = async () => {
    setTimeout(() => setShowForm(true), 500);
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center overflow-hidden relative">
      {/* Cricket Stadium Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80')"
        }}
      />

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

export default Login;
