
import { Routes, Route, Navigate } from "react-router-dom";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PracticeInterview from "./pages/PracticeInterview";
import Chatbot from "./components/Chatbot";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Original Home Page */}
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<GuestRoute><Login /></GuestRoute>}
        />

        <Route
          path="/register"
          element={<GuestRoute><Register /></GuestRoute>}
        />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/interview"
          element={<ProtectedRoute><PracticeInterview /></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute><Admin /></ProtectedRoute>}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Chatbot />
    </>
  );
}

















