import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import {
  Bug,
  Home,
  ImportIcon,
  MessageSquareWarning,
  Settings,
  UserCircle,
} from "lucide-react";
import { BiSolidFileExport, BiSolidFileImport } from "react-icons/bi";
import { TiExport } from "react-icons/ti";
import toast from "react-hot-toast";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import useAuth from "../Hooks/useAuth/useAuth";
import Loading from "../Components/Loading";

const DashboardLayout = () => {
  const { user, signOutUser, loading } = useAuth();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  if (loading) {
    return <Loading></Loading>;
  }

  const handleSignOutUser = () => {
    signOutUser().then(() => {
      toast.success("Log out successful");
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-5 flex flex-col md:flex-row items-center justify-center gap-1.5 md:justify-between w-full">
            <h1 className="text-md sm:text-xl md:text-2xl font-bold">
              Dashboard{" "}
              <span className="text-primary hidden sm:inline">
                {user?.displayName}
              </span>
            </h1>
            <div className="flex items-center gap-5">
              <label className="flex cursor-pointer gap-2">
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                  className="toggle theme-controller"
                />
              </label>
              <button
                onClick={handleSignOutUser}
                className="btn btn-sm btn-outline btn-primary"
              >
                <IoLogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Home item */}

            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                <Home size={18} />
                <span className="is-drawer-close:hidden">Home</span>
              </Link>
            </li>

            {/* My Exports */}

            <li>
              <Link
                to={"my-exports"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Exports"
              >
                <BiSolidFileExport size={18} />
                <span className="is-drawer-close:hidden">My Exports</span>
              </Link>
            </li>

            {/* My Imports */}

            <li>
              <Link
                to={"my-imports"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Imports"
              >
                <BiSolidFileImport size={18} />
                <span className="is-drawer-close:hidden">My Imports</span>
              </Link>
            </li>

            {/* Dashboard item */}

            <li>
              <Link
                to={"/dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                <MdOutlineDashboardCustomize size={18} />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            {/* Add Export  */}

            <li>
              <Link
                to={"add-export"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Export"
              >
                <TiExport size={18} />
                <span className="is-drawer-close:hidden">Report Issue</span>
              </Link>
            </li>

            {/* Profile item */}
            <li>
              <Link
                to={"profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <UserCircle size={18} />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            {/* Settings icon */}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <Settings size={18} />
                {/* <LucideSettings2  size={18}/> */}
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
