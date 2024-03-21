/**
 * A component that renders the children only if the user is authenticated.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to be rendered if the user is authenticated.
 * @returns {React.ReactNode} - The rendered component.
 */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
