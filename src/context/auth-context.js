import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  role: "",
  login: (token, role) => {},
  logout: () => {},
});

const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(getCookie("token"));
  const [role, setRole] = useState(getCookie("role"));

  const loginHandler = (token, role) => {
    setToken(token);
    setRole(role);
    document.cookie = `token=${token}; path=/`;
    document.cookie = `role=${role}; path=/`;
  };

  const logoutHandler = () => {
    setToken("");
    setRole("");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const contextValue = {
    token: token,
    role: role,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
