import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Robot from "./Animation/Robot";

const navItems = [
  { name: "Home", path: "/", icon: "https://img.icons8.com/3d-plastilina/69/home--v2.png" },
  { name: "Notepad", path: "/notepad", icon: "https://img.icons8.com/3d-fluency/94/ball-point-pen.png" },
  { name: "Diary", path: "/diary", icon: "https://img.icons8.com/3d-fluency/94/timetable.png" },
  { name: "Activity", path: "/activity", icon: "https://img.icons8.com/3d-fluency/94/increase.png" },
  { name: "Actions", path: "/actions", icon: "https://img.icons8.com/color/48/filled-trash.png" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-center mt-2 px-4">

      
      
      <nav className="flex items-center gap-4 bg-white px-5 h-16 rounded-3xl shadow-sm w-auto">

    
      

     
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

    </div>
  );
};

export default Navbar;