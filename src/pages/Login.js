import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const username = useRef();
  const password = useRef();

  const [credMsg, setCredMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await axios
      .post("http://localhost:3001/login", {
        username: username.current.value,
        password: password.current.value,
      })
      .then((response) => {
        setCredMsg();
        console.log(response);

        authCtx.login(response.data.accessToken, response.data.role);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401)
          setCredMsg("Wait for admin to verify your account.");
        else setCredMsg("Invalid username or password.");
      });

    setIsLoading(false);
  };

  return (
    <div className="grid h-screen place-items-center p-5 w-full">
      <form
        className="w-full max-w-lg"
        onSubmit={onSubmitHandler}
        autoComplete="off"
      >
        <p className="text-xs md:text-sm text-right">
          Don't have an account?{" "}
          <Link to="/register">
            <b>
              <u>Sign Up</u>
            </b>
          </Link>
        </p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
              Username
            </label>
            <input
              className={
                credMsg
                  ? "appearance-none block w-full bg-gray-200 text-primary border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                  : "appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              }
              id="username"
              type="text"
              required
              ref={username}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
              Password
            </label>
            <input
              className={
                credMsg
                  ? "appearance-none block w-full bg-gray-200 text-primary border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                  : "appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              }
              id="password"
              type="password"
              required
              ref={password}
            />
            <p className="text-red-500 text-xs md:text-sm italic">
              {credMsg ? credMsg : <br />}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 flex flex-row-reverse">
            <input
              className="shadow bg-tertiary-400 hover:bg-tertiary-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Log In"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 invisible ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
              Placeholder
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              // id="password"
              type="password"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 md:mb-0">
            <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              // id="confirmPassword"
              type="password"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
