import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUserCheck,
  FaPiggyBank,
  FaSignOutAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import AuthContext from "../context/auth-context";

const SideBar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white shadow-lg z-50">
      {authCtx.role === "admin" && (
        <>
          <Link to="/admin">
            <SideBarIcon icon={<FaPiggyBank size="20" />} text="Home" />
          </Link>
          <Divider />
          <Link to="/admin/account">
            <SideBarIcon
              icon={<FaUserCheck size="20" />}
              text="Verify Accounts"
            />
          </Link>
          <Link to="/admin/transaction">
            <SideBarIcon
              icon={<FaExchangeAlt size="20" />}
              text="Check Transactions"
            />
          </Link>
          <Link to="/admin/search">
            <SideBarIcon
              icon={<FaSearch size="20" />}
              text="Search Customers"
            />
          </Link>
          <Divider />
          <button onClick={authCtx.logout}>
            <SideBarIcon icon={<FaSignOutAlt size="20" />} text="Log Out" />
          </button>
        </>
      )}
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡" }) => (
  <div className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-secondary hover:bg-primary text-primary hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group">
    {icon}
    <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-primary bg-secondary text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => (
  <hr className="bg-gray-200 border border-gray-200 rounded-full mx-2" />
);

export default SideBar;
