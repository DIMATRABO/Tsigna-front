import DashboardLayout from "components/DashboardLayout";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default ProtectedRoutes;
