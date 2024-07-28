import React from "react";
import Logo from "../../assets/images/IMG-20240427-WA0001_prev_ui.png";
import { IoMdSearch } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import DarkMode from "./DarkMode";
import { logout } from "../../services/loginPageApi";

function Navbar({ setSearchText }) {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200" >
      <div className="bg-white py-2 flex justify-between dark:bg-gray-900 dark:text-white" style={{paddingLeft:"10px",paddingRight:"10px"}}>
        {/* Logo */}
        <div>
          <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={Logo} alt="YarlVibe" className="w-10" />
            Yarlvibe
          </a>
        </div>

        {/* search bar and logout button */}
        <div className="flex justify-between items-center gap-4">
          {/* search bar */}
          <div className="relative group hidden sm:block dark:text-white">
            <input
              type="text"
              placeholder="search"
              className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300
                rounded-full border border-gray-300 px-2 py-1 focus:outline-none

                focus:border-1 focus:border-primary dark:bg-slate-800"


              onChange={(e) => setSearchText(e.target.value)}

            />
            <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
          </div>

          {/* logout button */}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
          >
            <span className="group-hover:block hidden transition-all duration-200">
              Logout
            </span>
            <TbLogout className="text-xl text-white drop-shadow-sm cursor-pointer" />
          </button>

          {/* Dark mode */}
          <div>
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );

  //   logout function
  async function handleLogout(e) {
    e.preventDefault();
    console.log(localStorage.getItem("user"));

    try {
      await logout();
      //console.log("Successfully logout", localStorage.getItem("user"));
    } catch (err) {
      console.log("logout failed: ", err);
    }
  }
}

export default Navbar;
