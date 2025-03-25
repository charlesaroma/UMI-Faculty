import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import StudentsManagement from "./pages/StudentsManagement/StudentsManagement.jsx";
import GradeManagement from "./pages/GradeManagement/GradeManagement.jsx";
import Notifications from "./pages/Notification/Notifications.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import UserRoles from "./pages/UserRoles/UserRoles.jsx";
import StudentProfile from "./pages/StudentsManagement/StudentProfile.jsx";
import ScrollToTopWrapper from "./components/ScrollToTopWrapper.jsx";
import { AuthProvider } from "./store/context/AuthContext.jsx";
import { useAuth } from "./store/context/AuthContext.jsx";
import SubmitStudentProposal from "./pages/StudentsManagement/SubmitStudentProposal.jsx";

// PublicRoute: Redirects authenticated users away from public pages (like login)
// If user is authenticated, redirects to dashboard
// If user is not authenticated, shows the public page content
const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
};

// ProtectedRoute: Protects private routes from unauthenticated access
// If user is authenticated, shows the protected content
// If user is not authenticated, redirects to login page
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTopWrapper>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                   <DashboardLayout />
                </ProtectedRoute>
              }
            >
        <Route index element={<Navigate to="/dashboard" replace />} />

              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="students" element={<StudentsManagement />} />
              <Route path="students/profile/:id" element={<StudentProfile />} />
              <Route path="students/submit-proposal/:id" element={<SubmitStudentProposal />} />
              <Route path="grades" element={<GradeManagement />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="user-roles" element={<UserRoles />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Default Route */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </ScrollToTopWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
