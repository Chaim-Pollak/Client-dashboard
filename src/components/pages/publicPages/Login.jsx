import React from "react";
import LoginForm from "../forms/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl border-2 border-amber-100">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-amber-900 tracking-tight bg-gradient-to-r from-amber-500  via-amber-600 to-amber-300 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <LoginForm />
        <div className="mt-8 text-center">
          <a
            href="#"
            className="cursor-not-allowed text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors duration-200"
            aria-disabled={"true"}
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
