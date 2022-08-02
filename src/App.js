import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
import Account from "./pages/admin/Account";
import Transaction from "./pages/admin/Transaction";
import Admin from "./pages/admin/Admin";
import Search from "./pages/admin/Search";
import Profile from "./pages/admin/Profile";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Routes>
        {authCtx.role === "admin" && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/account" element={<Account />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/search" element={<Search />} />
            <Route path="/admin/search/:username" element={<Profile />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}
        {authCtx.role === "customer" && <></>}
        {authCtx.role === "" && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
