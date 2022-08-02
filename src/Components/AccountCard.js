import axios from "axios";
import { useContext } from "react";
import { CgCheck, CgClose } from "react-icons/cg";
import AuthContext from "../context/auth-context";

export default function AccountCard({
  username = "username",
  name = "name",
  img = "https://picsum.photos/id/250/96/96",
}) {
  const authCtx = useContext(AuthContext);

  const onAcceptHandler = () => {
    axios
      .put(
        "http://localhost:3001/admin/verify",
        { username: username, verify: "customer" },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRejectHandler = () => {
    axios
      .put(
        "http://localhost:3001/admin/verify",
        { username: username, verify: "customer" },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div class="max-w-sm w-11/12 bg-white rounded-lg border border-gray-200 shadow-md">
        <div class="flex justify-end px-4 pt-4"></div>
        <div class="flex flex-col items-center py-10">
          <img
            class="mb-3 w-24 h-24 rounded-full shadow-lg"
            src={img}
            alt={username}
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900">{name}</h5>
          <span class="text-sm text-gray-500">{username}</span>
          <div class="flex mt-4 space-x-3 lg:mt-6">
            <button
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={onAcceptHandler}
            >
              <CgCheck />
            </button>
            <button
              class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={onRejectHandler}
            >
              <CgClose />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
