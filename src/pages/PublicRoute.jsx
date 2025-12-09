import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function PublicRoute({ childern }) {
  const status = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return <div>{status ? navigate("/chat") : childern}</div>;
}

export default PublicRoute;
