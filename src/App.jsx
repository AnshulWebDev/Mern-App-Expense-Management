import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import NotFoundPage from "./pages/NotFoundPage ";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
            <Homepage />
          </ProtectedRoutes>
          }
        />
        <Route path="/" element={<Welcome/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
};
export default App;
