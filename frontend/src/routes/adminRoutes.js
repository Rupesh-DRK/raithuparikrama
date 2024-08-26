import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth"
import { Outlet } from "react-router-dom";
import axios from "axios";
import Page from "../Pages/Page";


export default function AdminRoutes() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:5002/backend/admin/admin-auth");

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Page/>;
}