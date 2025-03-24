import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo2.png";
import { useAuth } from "../store/context/AuthContext.jsx";
import { RiLogoutBoxRLine, RiUserLine } from "react-icons/ri";
import { useGetFacultyProfile } from "../store/tanstackStore/services/queries";
import { Icon } from "@iconify-icon/react";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data } = useGetFacultyProfile();

  const menuItems = [
    {
      label: "Dashboard",
      icon: "material-symbols-light:browse-sharp",
      path: "/dashboard",
    },
    {
      label: "Students Management", 
      icon: "material-symbols-light:person-raised-hand",
      path: "/students",
    },
    {
      label: "Grade Management",
      icon: "heroicons-solid:calendar",
      path: "/grades",
    },
    {
      label: "Notifications",
      icon: "material-symbols:deployed-code-sharp",
      path: "/notifications",
    },
    {
      label: "Settings",
      icon: "material-symbols:manufacturing",
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <img src={Logo} alt="UMI Logo" className="w-full h-14" />
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <RiUserLine className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="text-sm font-[Inter-Medium] text-gray-700">
                {data?.faculty?.name}
              </h3>
              <p className="text-xs font-[Inter-Regular] text-gray-500">
                {data?.faculty?.designation}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <h3 className="px-3 text-xs mb-2 font-[Inter-Medium] text-gray-500  tracking-wider">
              Main Activities
            </h3>
            <div className="flex flex-col gap-2 ">
              {menuItems.slice(0, 4).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 min-h-[40px] gap-2 text-xs font-[Inter-Medium] rounded-md ${
                      isActive
                        ? "!text-[#23388F]  bg-[#ECF6FB] [&_svg]:opacity-100 [&_span]:!text-[#23388F]"
                        : "text-gray-400   hover:bg-[#ECF6FB]  [&_span]:text-gray-700"
                    }`
                  }
                >
                  <Icon icon={item.icon} width="24" height="24" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <h3 className="mt-4 px-3 text-xs font-[Inter-Medium] text-gray-500  tracking-wider">
                Other Options
              </h3>

              {menuItems.slice(4).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 gap-2 text-xs font-[Inter-Medium] rounded-md ${
                      isActive
                        ? "!text-[#23388F]  bg-[#ECF6FB] [&_svg]:opacity-100 [&_span]:!text-[#23388F]"
                        : "text-gray-400   hover:bg-[#ECF6FB]  [&_span]:text-gray-700"
                    }`
                  }
                >
                  <Icon icon={item.icon} width="24" height="24" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between gap-3 px-4 py-2 rounded-md w-full text-[#070B1D] hover:bg-[#ECF6FB]"
          >
            <span className="text-sm font-[Roboto-Medium]  text-red-700">
              Logout
            </span>
            <span className="rounded-[6px] w-9 h-7 p-2 border border-red-700 bg-red-100  flex items-center justify-center overflow-hidden">
              <RiLogoutBoxRLine className="w-5 h-5 text-red-700" />
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
