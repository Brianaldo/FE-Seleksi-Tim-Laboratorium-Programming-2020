import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import AuthContext from "../../context/auth-context";
import { FaUserCheck } from "react-icons/fa";
import { CgCheck, CgClose } from "react-icons/cg";
import {
  DangerToast,
  SuccessToast,
  WarningToast,
} from "../../Components/Toast";
import ToastContext from "../../context/toast-context";

export default function AdminAccount() {
  const authCtx = useContext(AuthContext);
  const toastsCtx = useContext(ToastContext);

  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/verify", {
        headers: { Authorization: authCtx.token },
      })
      .then((response) => {
        // console.log(response.data);
        setPendingAccounts(response.data);
      })
      .catch((error) => {
        // console.log(error);
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
  }, []);

  const onAcceptHandler = (index, username) => {
    axios
      .put(
        "http://localhost:3001/admin/verify",
        { username: username, verify: "customer" },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        // console.log(response);
        let newPendingAccounts = [...pendingAccounts];
        newPendingAccounts.splice(index, 1);
        setPendingAccounts(newPendingAccounts);

        toastsCtx.push(
          <SuccessToast
            message={`${username} verified.`}
            key={toastsCtx.toasts.length}
          />
        );
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 400) {
          toastsCtx.push(
            <WarningToast
              message="Fail to verify."
              key={toastsCtx.toasts.length}
            />
          );

          return;
        }

        toastsCtx.push(
          <WarningToast
            message="Internal server error."
            key={toastsCtx.toasts.length}
          />
        );
      });
  };

  const onRejectHandler = (index, username) => {
    axios
      .put(
        "http://localhost:3001/admin/verify",
        { username: username, verify: "denied" },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        // console.log(response);
        let newPendingAccounts = [...pendingAccounts];
        newPendingAccounts.splice(index, 1);
        setPendingAccounts(newPendingAccounts);

        toastsCtx.push(
          <DangerToast
            message={`${username} rejected.`}
            key={toastsCtx.toasts.length}
          />
        );
      })
      .catch((error) => {
        // console.log(error);
        toastsCtx.push(
          <WarningToast
            message="Fail to reject."
            key={toastsCtx.toasts.length}
          />
        );
      });
  };
  return (
    <>
      <SideBar />
      <div className="w-screen pl-16">
        {!isLoading && pendingAccounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen uppercase text-tertiary-400 font-semibold text-lg">
            <FaUserCheck size="200px" />
            <h1>No Unverified Accounts</h1>
          </div>
        ) : (
          <>
            <h1 className="block uppercase tracking-wide text-primary text-base md:text-lg font-bold my-4 text-center">
              Unverified Accounts
            </h1>
            {isLoading ? (
              <div class="flex items-center justify-center h-screen">
                <div role="status m-auto">
                  <svg
                    class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-tertiary-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center px-10 mb-10">
              {pendingAccounts.map((account, index) => {
                return (
                  <AccountCard
                    name={account.name}
                    username={account.username}
                    img={account.identity_photo}
                    key={account.username}
                    onAcceptHandler={() => {
                      onAcceptHandler(index, account.username);
                    }}
                    onRejectHandler={() => {
                      onRejectHandler(index, account.username);
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const AccountCard = ({
  username = "username",
  name = "name",
  img = "https://picsum.photos/id/250/96/96",
  onAcceptHandler,
  onRejectHandler,
}) => {
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
};
