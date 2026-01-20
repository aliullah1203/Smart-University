import React from "react";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function PrivateRoute({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
