import { useRef } from "react";

export default function Login() {
  const username = useRef();
  const password = useRef();

  const onSubmitHandler = (e) => {
    console.log("Te");
  };

  return (
    <div className="grid h-screen place-items-center">
      <form className="w-full max-w-sm" onSubmit={onSubmitHandler}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-primary font-bold md:text-right mb-1 md:mb-0 pr-4">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              id="username"
              type="text"
              placeholder="username"
              ref={username}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-primary font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              id="inline-password"
              type="password"
              ref={password}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <input
              className="shadow bg-tertiary-400 hover:bg-tertiary-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Log In"
            />
            <span className="text-center text-primary font-bold h-full place-items-center ml-8">
              or <u>Sign Up</u>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
