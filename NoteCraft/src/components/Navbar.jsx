import { Link, useLocation } from "react-router-dom";

import Switch from "./Animation/Switch";

import { ToggleTheme } from "./AuthProvider";

import { useContext } from "react";

const navItems = [
  { name: "Home", path: "/", icon: "https://img.icons8.com/3d-plastilina/69/home--v2.png" },
  { name: "Notepad", path: "/notepad", icon: "https://img.icons8.com/3d-fluency/94/ball-point-pen.png" },
  { name: "Diary", path: "/diary", icon: "https://img.icons8.com/3d-fluency/94/timetable.png" },
  { name: "Activity", path: "/activity", icon: "https://img.icons8.com/3d-fluency/94/increase.png" },
  { name: "Actions", path: "/actions", icon: "https://img.icons8.com/color/48/filled-trash.png" },
];

const Navbar = () => {

  const { Theme, setTheme } = useContext(ToggleTheme)



  const toggle = () => {

    console.log("Theme is: ", Theme)
    console.log("Entere ind toggle")

    setTheme(prev => prev === 'Light' ? 'Dark' : 'Light')



  };





  const location = useLocation();

  return (
    <div className={Theme === 'Dark'?"fixed top-0 left-0 w-full z-[100] flex items-center justify-center mt-2 px-4":"fixed top-0 left-0 w-full z-[100] flex items-center justify-center mt-0 px-4"}>


      <div className="flex  items-center rounded-2xl">

        <nav className="flex items-center gap-4 bg-blue-200 px-5 h-20 rounded-3xl  w-auto">


          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-300"}
              `}
              >
                <img src={item.icon} alt="" className="h-10 w-10" />
                <span className="text-3xl">{item.name}</span>
              </Link>
            );
          })}

        </nav>

        <Switch
          onChange={toggle}
        />




      </div>



    </div>
  );
};

export default Navbar;