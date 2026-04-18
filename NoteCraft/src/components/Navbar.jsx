import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import Switch from "./Animation/Switch";
import { ToggleTheme } from "./AuthProvider";

const navItems = [
  {
    name: "Home",
    path: "/",
    icon: "https://img.icons8.com/3d-plastilina/69/home--v2.png",
  },
  {
    name: "Notepad",
    path: "/notepad",
    icon: "https://img.icons8.com/3d-fluency/94/ball-point-pen.png",
  },
  {
    name: "Diary",
    path: "/diary",
    icon: "https://img.icons8.com/3d-fluency/94/timetable.png",
  },
  {
    name: "Activity",
    path: "/activity",
    icon: "https://img.icons8.com/3d-fluency/94/increase.png",
  },
  {
    name: "Actions",
    path: "/actions",
    icon: "https://img.icons8.com/color/48/filled-trash.png",
  },
];

const Navbar = () => {
  const { Theme, setTheme } = useContext(ToggleTheme);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = () => {
    setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-3 sm:px-4 mt-2 min-w-full flex justify-center">
      <div className=" w-fit max-w-7xl">
       
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 shadow-lg ${
            Theme === "Light"
              ? "bg-gradient-to-br from-sky-200 via-sky-300 to-sky-400"
              : "bg-gradient-to-br from-black via-gray-900 to-gray-800"
          }`}
        >
         

        {/* Deskstop view */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : Theme === "Light"
                      ? "bg-white/60 text-slate-700 hover:bg-white"
                      : "bg-white/10 text-gray-200 hover:bg-white/20"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-sm lg:text-base font-semibold">
                    {item.name}
                  </span>
                </Link>
              );
            })}
              <Switch onChange={toggle} />
          </nav>

       
          <div className="flex items-center gap-3">
           

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden text-2xl px-2 ${
                Theme === "Light" ? "text-slate-800" : "text-white"
              }`}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className={`md:hidden mt-2 rounded-2xl p-3 space-y-2 shadow-lg ${
              Theme === "Light"
                ? "bg-white"
                : "bg-gray-900 border border-gray-700"
            }`}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : Theme === "Light"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;