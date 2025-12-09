import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { status } = useSelector((state) => state.auth);

  return status ? children : <Navigate to="/" />;
}
