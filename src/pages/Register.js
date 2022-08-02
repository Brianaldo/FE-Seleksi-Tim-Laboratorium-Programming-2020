import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Toast, { SuccessToast } from "../Components/Toast";

export default function Register() {
  const name = useRef();
  const username = useRef();
  const photo = useRef();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [invalidUsernameMsg, setinvalidUsernameMsg] = useState();
  const [toasts, setToasts] = useState([]);

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
    } else {
      let base64;

      const file = photo.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        base64 = reader.result;
        await axios
          .post("http://localhost:3001/register", {
            username: username.current.value,
            password: password,
            name: name.current.value,
            identityPhoto: String(base64),
          })
          .then((response) => {
            // console.log(response);
            setToasts([
              ...toasts,
              <SuccessToast
                message="Account registered."
                key={toasts.length}
              />,
            ]);

            setPassword();
            setConfirmPassword();
            setinvalidUsernameMsg();
            e.target.reset();
          })
          .catch((error) => {
            // console.log(error);
            setinvalidUsernameMsg("Username is taken.");
          });
      };
    }

    setIsLoading(false);
  };

  return (
    <>
      <Toast toasts={toasts} />
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
                ref={photo}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 flex flex-row-reverse">
              <input
                className="shadow cursor-pointer bg-tertiary-400 hover:bg-tertiary-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Sign Up"
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
