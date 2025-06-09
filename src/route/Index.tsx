import { Routes, Route, Navigate } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import Home from "../pages/Home";
import PublicRoutes from "./PublicRoutes";
import { Presentation } from "../pages/Presentation";


const AppRoutes = () => {
  return (
    <Routes>

   <Route element={<PublicRoutes />}>
        <Route path="/" element={<Presentation />} />
        <Route path="/home" element={<Home />} />
      </Route>



      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
