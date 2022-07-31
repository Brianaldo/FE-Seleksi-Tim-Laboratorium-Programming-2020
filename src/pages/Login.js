import { useRef } from "react";

export default function Login() {
  const username = useRef();
  const password = useRef();

  const onSubmitHandler = (e) => {
    console.log("Te");
  };

  return (
    <div className="grid h-screen place-items-center p-5">
      <form class="w-full max-w-lg">
        <p class="text-xs text-right">
          Don't have an account? <b>Sign Up</b>
        </p>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Username
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              id="username"
              type="text"
            />
            <p class="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Username
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-tertiary-400"
              id="username"
              type="text"
            />
            <p class="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 flex flex-row-reverse">
            <input
              className="shadow bg-tertiary-400 hover:bg-tertiary-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Log In"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
