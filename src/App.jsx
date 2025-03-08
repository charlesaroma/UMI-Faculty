import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import StudentsManagement from './pages/StudentsManagement/StudentsManagement';
import GradeManagement from './pages/GradeManagement/GradeManagement';
import Notifications from './pages/Notification/Notifications';
import Settings from './pages/Settings/Settings';
import UserRoles from './pages/UserRoles/UserRoles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentsManagement />} />
          <Route path="grades" element={<GradeManagement />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="user-roles" element={<UserRoles />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
