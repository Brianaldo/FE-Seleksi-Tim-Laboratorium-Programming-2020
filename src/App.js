// import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
import LandingPage from "./pages/LandingPage";
import AdminAccount from "./pages/admin/AdminAccount";
import AdminTransaction from "./pages/admin/AdminTransaction";
import AdminSearch from "./pages/admin/AdminSearch";
import AdminProfile from "./pages/admin/AdminProfile";
import Profile from "./pages/customer/Profile";
import Transaction from "./pages/customer/Transaction";
import Transfer from "./pages/customer/Transfer";
import Toast from "./Components/Toast";
import ToastContext from "./context/toast-context";

function App() {
  const authCtx = useContext(AuthContext);
  const toastsCtx = useContext(ToastContext);

  return (
    <>
      <Routes>
        <Route element={<Toast toasts={toastsCtx.toasts} />}>
          {authCtx.role === "admin" && (
            <>
              <Route path="/admin" element={<LandingPage />} />
              <Route path="/admin/account" element={<AdminAccount />} />
              <Route path="/admin/transaction" element={<AdminTransaction />} />
              <Route path="/admin/search" element={<AdminSearch />} />
              <Route
                path="/admin/search/:username"
                element={<AdminProfile />}
              />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          )}
          {authCtx.role === "customer" && (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
          {authCtx.role === "" && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default App;
