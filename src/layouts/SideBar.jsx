import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Bell, UserCog, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo2.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = {
    name: 'Joshua Kimbareeba',
    role: 'IT Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Students Management', icon: Users, path: '/dashboard/students' },
    { label: 'Grade Management', icon: GraduationCap, path: '/dashboard/grades' },
    { label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { label: 'User Roles Management', icon: UserCog, path: '/dashboard/user-roles' },
    { label: 'Settings', icon: SettingsIcon, path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <img src={Logo} alt="UMI Logo" className="w-full h-16" />
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
            <div>
              <h3 className="text-sm font-medium">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main Activities
            </h3>
            {menuItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end  // Add 'end' prop to ensure the active state is only applied for exact matches
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'text-[#23388F] bg-[#ECF6FB]' // Active state styling
                      : 'text-gray-700 hover:bg-[#ECF6FB]' // Hover state styling
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}

            <h3 className="mt-8 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Other Options
            </h3>
            {menuItems.slice(4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end  // Add 'end' prop here as well for exact matching
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'text-[#23388F] bg-[#ECF6FB]' // Active state styling
                      : 'text-gray-700 hover:bg-[#ECF6FB]' // Hover state styling
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
