import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as Cricket, User, Lock, Mail } from 'lucide-react';
import { login, signup } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [isRegister]);

  const handleSubmit = async (e) => {
    console.log(isLogin);
    // e.preventDefault();
    try {
      let token;
      if (isLogin) {
        const response = await login(email, password);
        token = response?.data?.token;
      } else {
        const response = await signup(username, email, password);
        token = response?.data?.token;
      }
      await setToken(token);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setError("Authentication failed. Please check your credentials and try again.");
    }
  };


  useEffect(() => {
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [isRegister]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-500">
      <div className="relative w-[850px] h-[550px] bg-gray-300 rounded-3xl shadow-2xl overflow-hidden">

        {/* Login Form */}
        <div
          className={`absolute inset-0 w-1/2 h-full bg-gray-300 flex flex-col justify-center items-center text-center p-10 transition-all duration-500 ${isRegister ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-full opacity-100 pointer-events-auto"}`}
          style={{ zIndex: isTransitioning ? "auto" : isRegister ? 1 : 2 }} // No z-index during transition
        >
          <h1 className="text-3xl font-bold">Login</h1>
          <div className="w-full mt-4">
            <div className="relative my-4">
              <input type="text" placeholder="Email" className="w-full p-3 bg-gray-100 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="relative my-4">
              <input type="password" placeholder="Password" className="w-full p-3 bg-gray-100 rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="w-full bg-gray-700 text-white py-3 rounded-md mt-2" onClick={() => {console.log("Login");setIsLogin(true);handleSubmit();}}>Login</button>
          </div>
          <p className="mt-4 text-sm">or login with social platforms</p>
        </div>

        {/* Register Form */}
        <div
          className={`absolute inset-0 w-1/2 h-full bg-gray-300 flex flex-col justify-center items-center text-center p-10 transition-all duration-500 ${isRegister ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}
          style={{ zIndex: isTransitioning ? "auto" : isRegister ? 2 : 1 }} // No z-index during transition
        >
          <h1 className="text-3xl font-bold">Register</h1>
          <div className="w-full mt-4">
            <div className="relative my-4">
              <input type="text" placeholder="Username" className="w-full p-3 bg-gray-100 rounded-md outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="relative my-4">
              <input type="email" placeholder="Email" className="w-full p-3 bg-gray-100 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="relative my-4">
              <input type="password" placeholder="Password" className="w-full p-3 bg-gray-100 rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="w-full bg-gray-700 text-white py-3 rounded-md mt-2" onClick={() => {setIsLogin(false);handleSubmit()}}>Register</button>
          </div>
          <p className="mt-4 text-sm">or register with social platforms</p>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div
            className="absolute w-full h-full bg-gray-700 rounded-[150px] transition-all duration-700"
            style={{ transform: isRegister ? "translateX(50%) " : "translateX(-50%)" }}
          ></div>
          <div className="absolute flex justify-between w-full px-10">
            <div className="text-white text-center register" style={{ opacity: isRegister ? 0 : 1, padding: "inherit" }}>
              <h1 className="text-2xl font-bold">Hello, Welcome!</h1>
              <p className="text-sm">Don't have an account?</p>
              <button onClick={() => {setIsRegister(true)}} className="mt-4 border border-white px-6 py-2 rounded-md">
                Register
              </button>
            </div>
            <div className="text-white text-center login" style={{ opacity: isRegister ? 1 : 0, padding: "inherit" }}>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm">Already have an account?</p>
              <button onClick={() => {setIsRegister(false)}} className="mt-4 border border-white px-6 py-2 rounded-md">
                Login
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
