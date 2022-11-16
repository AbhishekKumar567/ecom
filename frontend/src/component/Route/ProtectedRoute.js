import React from "react";
import { useSelector } from "react-redux";
import { Link, Route,Routes } from "react-router-dom";

export const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
       
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Link to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Link to="/login" />;
            }

            return <Component {...props} />;
          }}
        />
       
      )}
    </>
  );
};


