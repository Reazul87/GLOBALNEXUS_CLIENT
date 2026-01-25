import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
    // return (
    //   <div className="flex justify-center items-center min-h-screen">
    //     <span className="loading loading-spinner loading-lg text-yellow-400"></span>
    //   </div>
    // );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
    // return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRouter;
