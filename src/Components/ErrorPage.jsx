import React from "react";

import { Link } from "react-router";
import { FiAlertCircle, FiHome } from "react-icons/fi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FiAlertCircle className="w-20 h-20 text-[#FF6F00] mx-auto mb-4" />
        </div>

        <h1
          className="text-6xl md:text-8xl font-extrabold text-[#173A75] mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          404
        </h1>

        <p
          className="text-lg md:text-xl text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Something went wrong!
        </p>

        <div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 btn bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none rounded-full px-6"
          >
            <FiHome />
            Back to Home
          </Link>
        </div>

        <div
          className="absolute top-4 right-4 text-[#FF6F00]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
