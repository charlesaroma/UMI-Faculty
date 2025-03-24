import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar.jsx';  // Import Sidebar component

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />  {/* Use Sidebar component here */}

      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
