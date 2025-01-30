import React, { useState } from "react";
import { Menu, X, User, LogOut, Link } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { ActionContext } from "../contexts/ActionContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, signOut } = useContext(AuthContext);
  const { handleEditEmployee } = useContext(ActionContext);

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-amber-500  via-amber-600 to-amber-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <a href="/welcomepage" className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dl8slx4ca/image/upload/v1735766284/cromi0bys1fd2k7q7dgl.png"
                alt="Logo"
                className="w-44 rounded"
              />
            </a>

            <div className="hidden md:flex space-x-8">
              <NavLink
                to="/allissues"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                All Issues
              </NavLink>

              <NavLink
                to="/myissue"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                My Issues
              </NavLink>
              <NavLink
                to="/myissuehistory"
                className="text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                My Issues History
              </NavLink>
            </div>
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center">
              <div className="relative ">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-sm text-white">
                    {user?.employeeName}
                  </span>
                </button>

                {/* Desktop Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-4 mt-2 w-48 bg-amber-100 rounded-xl shadow-lg py-1 z-50">
                    <button
                      onClick={() => handleEditEmployee(user)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-white hover:bg-white/20 p-2 rounded-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Sidebar */}
          <div className="fixed top-16 left-0 right-0 bg-amber-100 shadow-lg transform transition-transform duration-300 ease-in-out origin-top w-[90%] rounded m-auto">
            <div className="flex flex-col w-full max-w-md mx-auto p-4">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <X
                    onClick={() => setIsSidebarOpen(false)}
                    className="h-6 w-6"
                  />
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="px-4 py-2">
                <NavLink
                  onClick={() => setIsSidebarOpen(false)}
                  to="/allissues"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  All Issues
                </NavLink>
                <NavLink
                  onClick={() => {
                    mutateMyIssue({ id: user._id });
                    setIsSidebarOpen(false);
                  }}
                  to="/myissue"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  My Issues
                </NavLink>
                <NavLink
                  to="/myissuehistory"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  My Issues History
                </NavLink>
              </div>

              {/* Mobile user menu */}
              <div className="mt-auto border-t border-gray-200">
                <div className="px-4 py-4">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm text-gray-700">
                      {user?.employeeName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleEditEmployee(user);
                      setIsSidebarOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
