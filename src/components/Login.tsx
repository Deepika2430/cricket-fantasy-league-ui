import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Ticket as Cricket, User, Lock, Mail } from 'lucide-react';
import { login, signup } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  username: yup.string().when('isRegister', {
    is: true,
    then: yup.string().required('Username is required'),
  }),
});

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        let token, role, response;
        if (isLogin) {
          response = await login(values.email, values.password);
          token = response?.data?.token;
          role = response?.data?.role; // Get role from response
        } else {
          response = await signup(values.username, values.email, values.password);
          token = response?.data?.token;
          role = response?.data?.role; // Get role from response
          toast.success('Registration successful! Please login.');
          setIsRegister(false);
          return;
        }
        formik.resetForm();
        await setToken(token, role); // Set token and role in context
        if (role === 'admin')
          navigate("/admin-dashboard");
        else
          navigate("/home");
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
        formik.setFieldError('general', `Authentication failed. Please check your credentials and try again ${error?.message}`);
      }
    },
  });

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [isRegister]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-400 p-5 ">
      <ToastContainer />
      <div className="relative w-[750px] h-[450px] bg-gray-300 rounded-3xl shadow-2xl overflow-hidden">

        <div
          className={`absolute inset-0 w-1/2 h-full bg-gray-300 flex flex-col justify-center items-center text-center p-10 transition-all duration-500 ${isRegister ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-full opacity-100 pointer-events-auto"}`}
          style={{ zIndex: isTransitioning ? "auto" : isRegister ? 1 : 2 }} // No z-index during transition
        >
          <h1 className="text-3xl font-bold">Login</h1>
          <form onSubmit={formik.handleSubmit} className="w-full mt-4">
            <div className="relative my-4">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-100 rounded-md outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="relative my-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 bg-gray-100 rounded-md outline-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-md mt-2"
              onClick={() => { setIsLogin(true); }}
            >
              Login
            </button>
            {formik.errors.general && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.general}</div>
            )}
          </form>
          <p className="mt-4 text-sm">or login with social platforms</p>
        </div>

        <div
          className={`absolute inset-0 w-1/2 h-full bg-gray-300 flex flex-col justify-center items-center text-center p-10 transition-all duration-500 ${isRegister ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}
          style={{ zIndex: isTransitioning ? "auto" : isRegister ? 2 : 1 }} // No z-index during transition
        >
          <h1 className="text-3xl font-bold">Register</h1>
          <form onSubmit={formik.handleSubmit} className="w-full mt-4">
            <div className="relative my-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-3 bg-gray-100 rounded-md outline-none"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="relative my-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-100 rounded-md outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="relative my-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 bg-gray-100 rounded-md outline-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-md mt-2"
              onClick={() => { setIsLogin(false); }}
            >
              Register
            </button>
            {formik.errors.general && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.general}</div>
            )}
          </form>
          <p className="mt-4 text-sm">or register with social platforms</p>
        </div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div
            className="absolute w-full h-full bg-gray-800 rounded-[150px] transition-all duration-700"
            style={{ transform: isRegister ? "translateX(50%) " : "translateX(-50%)" }}
          ></div>
          <div className="absolute flex justify-between w-full px-10">
            <div className="text-white text-center register" style={{ opacity: isRegister ? 0 : 1, padding: "inherit" }}>
              <h1 className="text-2xl font-bold">Hello, Welcome!</h1>
              <p className="text-sm">Don't have an account?</p>
              <button onClick={() => { setIsRegister(true); formik.resetForm() }} className="mt-4 border border-white px-6 py-2 rounded-md">
                Register
              </button>
            </div>
            <div className="text-white text-center login" style={{ opacity: isRegister ? 1 : 0, padding: "inherit" }}>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm">Already have an account?</p>
              <button onClick={() => { setIsRegister(false); formik.resetForm() }} className="mt-4 border border-white px-6 py-2 rounded-md">
                Login
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}