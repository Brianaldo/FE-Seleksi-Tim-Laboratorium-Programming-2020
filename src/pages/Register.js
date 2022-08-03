import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SuccessToast, WarningToast } from "../Components/Toast";
import ToastContext from "../context/toast-context";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

  const toastsCtx = useContext(ToastContext);
  const navigate = useNavigate();

  const name = useRef();
  const username = useRef();
  const photo = useRef();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [invalidUsernameMsg, setinvalidUsernameMsg] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const onUsernameChangeHandler = (e) => {
    if (/^[a-zA-Z0-9_]+$/.test(e.target.value)) setinvalidUsernameMsg();
    else setinvalidUsernameMsg("Username can only be alphanumeric.");
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (
      invalidUsernameMsg ||
      password.length < 8 ||
      confirmPassword !== password
    ) {
      setIsLoading(false);
    } else {
      let base64;

      const file = photo.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        base64 = reader.result;
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
            username: username.current.value,
            password: password,
            name: name.current.value,
            identityPhoto: String(base64),
          })
          .then((response) => {
            // console.log(response);
            toastsCtx.push(
              <SuccessToast
                message="Account registered."
                key={toastsCtx.toasts.length}
              />
            );

            setPassword();
            setConfirmPassword();
            setinvalidUsernameMsg();
            e.target.reset();
            navigate("/login");
          })
          .catch((error) => {
            // console.log(error);
            if (error.response.status === 400) {
              setinvalidUsernameMsg("Username is taken.");
              return;
            }

            toastsCtx.push(
              <WarningToast
                message="Internal server error."
                key={toastsCtx.toasts.length}
              />
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
    }
  };

  return (
    <>
      <div className="grid h-screen place-items-center p-5">
        <form
          className="w-full max-w-lg"
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <p className="text-xs md:text-sm text-right">
            Already have an account?{" "}
            <Link to="/login">
              <b>
                <u>Log In</u>
              </b>
            </Link>
          </p>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                id="name"
                type="text"
                required
                ref={name}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-0">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
                Username
              </label>
              <input
                className={
                  invalidUsernameMsg
                    ? "appearance-none block w-full bg-gray-200 text-primary border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                    : "appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                }
                id="username"
                type="text"
                required
                onChange={onUsernameChangeHandler}
                ref={username}
              />
              <p className="text-red-500 text-xs md:text-sm italic mb-3">
                {invalidUsernameMsg ? invalidUsernameMsg : <br />}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
                Password
              </label>
              <input
                className={
                  password && password.length < 8
                    ? "appearance-none block w-full bg-gray-200 text-primary border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                    : "appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                }
                id="password"
                type="password"
                required
                onChange={onPasswordChangeHandler}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                className={
                  confirmPassword !== password
                    ? "appearance-none block w-full bg-gray-200 text-primary border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                    : "appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
                }
                id="confirmPassword"
                type="password"
                required
                onChange={onConfirmPasswordChangeHandler}
              />
            </div>
          </div>
          <p className="text-red-500 text-xs md:text-sm italic mb-3">
            {password && password.length < 8 ? (
              "Password must contain at least eight characters."
            ) : confirmPassword !== password ? (
              "Confirm password must have the same value as password."
            ) : (
              <br />
            )}
          </p>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-primary text-xs md:text-sm font-bold mb-2">
                Identity Photo
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-primary border border-gray-200 rounded py-3 px-4 leading-tight focus:border-tertiary-400 tracking-wide text-xs md:text-sm mb-2 cursor-pointer
                         file:border-none file:bg-gray-200 file:font-bold file:text-primary"
                id="large_size"
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  if (e.target.files[0].size > MAX_SIZE) {
                    e.target.value = null;
                    toastsCtx.push(
                      <WarningToast
                        message="File exceeded 2 MB."
                        key={toastsCtx.toasts.length}
                      />
                    );
                  }
                }}
                ref={photo}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 flex flex-row-reverse">
              <button
                className="shadow cursor-pointer bg-tertiary-400 hover:bg-tertiary-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:hover:bg-tertiary-400 disabled:cursor-not-allowed w-40"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      role="status"
                      class="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>Sign Up</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
