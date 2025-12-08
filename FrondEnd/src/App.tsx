import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/SignUp";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./Protect/ProtectRouteUser";
import DashBoard from "./Components/Admin/Dashboard";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import Login from "./Components/Admin/Login";
import { ToastContainer } from "react-toastify";
import AddUser from "./Components/Admin/AddUser";
import ProtectedAdmin from "./Protect/ProtectRouteAdmin";
// import useRefreshUser from "./Protect/UseRefreshUser"

function App() {
  // useRefreshUser()
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
        />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdmin>
                <DashBoard />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/addUser"
            element={
              <ProtectedAdmin>
                <AddUser />
              </ProtectedAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
