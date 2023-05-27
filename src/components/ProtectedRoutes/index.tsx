import { LoadingOverlay } from "@mantine/core";
import DashboardLayout from "components/DashboardLayout";
import { AuthContext } from "context/user";
import { ReactNode, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const { user, isLoading, isSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || isLoading) {
    return <LoadingOverlay visible />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default ProtectedRoutes;
