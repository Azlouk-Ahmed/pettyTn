import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Importez ToastContainer depuis react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importez les styles de react-toastify
//import LevelUp from  "views/admin/default/components/LevelUp";
//import PointsSystem from 'views/admin/default/components/PointsSystem'; // Import du composant PointsSystem


import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";

const App = () => {
  return (
    <div>
      <ToastContainer />
{/*      <PointsSystem /> */}
 {/*      <LevelUp /> */}
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
      </Routes>
    </div>
  );
};

export default App;
