import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event:any) => {
      if (event.target.closest(".menu-container")) return;
      setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen flex flex-grow">
      {/* Mobile Menu */}
      <div className="fixed top-0 left-0 z-50 h-screen w-screen flex items-center justify-center lg:hidden">
        <button
          className="bg-white p-2 rounded-md absolute top-4 right-4 z-50"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
  
        {menuOpen && (
          <div className="fixed top-0 left-0 z-50 h-screen w-1/2 bg-white shadow-lg flex items-center justify-center">
            <div className="w-[280px] bg-white font-Montserrat font-normal text-black text-left p-8 flex flex-col menu-container">
              <ul className="text-lg leading-[22px] space-y-8">
                <li className="flex flex-row items-center space-x-6 cursor-pointer">
                  <p className="font-bold">
                    <Link to="/" onClick={toggleMenu}>
                      Contacts
                    </Link>
                  </p>
                </li>
                <li className="flex flex-row items-center space-x-6 cursor-pointer">
                  <p className="font-bold">
                    <Link to="/charts" onClick={toggleMenu}>
                      Charts
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
  
      {/* Desktop Menu */}
      <div className="hidden lg:block w-[280px] h-full bg-black font-Montserrat font-normal text-white text-left p-8 flex flex-col justify-between">
        <div className="space-y-10">
          <p className="font-bold text-4xl leading-[44px] py-4">Navbar.</p>
          <div>
            <ul className="text-lg leading-[22px] space-y-8">
              <li className="flex flex-row items-center space-x-6 cursor-pointer">
                <p className="font-bold">
                  <Link to="/">Contacts</Link>
                </p>
              </li>
              <li className="flex flex-row items-center space-x-6 cursor-pointer">
                <p className="font-bold">
                  <Link to="/charts">Charts</Link>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      {/* Blurred Background */}
      {menuOpen && (
        <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-50"></div>
      )}
    </div>
  );
      }

export default Navbar;
