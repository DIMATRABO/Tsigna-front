import { LoadingOverlay } from "@mantine/core";
import DashboardLayout from "components/DashboardLayout";
import { AuthContext } from "context/user";
import { ReactNode, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoutes() {
  const { user, isLoading, isSuccess, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate, accessToken]);

  if (!user || isLoading || !isSuccess) {
    return <LoadingOverlay visible />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default ProtectedRoutes;
