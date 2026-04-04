
import { Link } from "react-router-dom";
import { Menu, X, Home, Book, Notebook, Activity } from "lucide-react";

import { useState } from "react";

const Navbar = () => {

    const [active, setActive] = useState("/");


    const navItems = [
        { name: "Home", path: "/", icon: <Home size={18} /> },
        { name: "Notepad", path: "/notepad", icon: <Notebook size={18} /> },
        { name: "Diary", path: "/diary", icon: <Book size={18} /> },
        { name: "Activity", path: "/activity", icon: <Activity size={18} /> },
    ];

    return (
        <div className="w-full flex justify-center mt-4 px-4">
            <nav className="w-full max-w-7xl bg-gray-100 text-black shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between sticky top-0 z-50 ">


                <h1 className="text-2xl font-bold tracking-wide">
                    MyApp
                </h1>


                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            onClick={() => setActive(item.path)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-3xl transition-all duration-200
                                     ${active === item.path
                                    ? "bg-blue-700 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </div>

            </nav>
        </div>
    );
};

export default Navbar;