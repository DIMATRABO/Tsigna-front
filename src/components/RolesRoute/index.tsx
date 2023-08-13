import { AuthContext } from "context/user";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  roles: string[];
};

const RolesRoute = ({ roles }: Props) => {
  const { user } = useContext(AuthContext);

  if (!user || !roles.includes(user.privilege)) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default RolesRoute;
