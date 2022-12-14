import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CgCheck, CgClose } from "react-icons/cg";
import SideBar from "../../Components/SideBar";
import AuthContext from "../../context/auth-context";
import { FaExchangeAlt } from "react-icons/fa";
import {
  DangerToast,
  SuccessToast,
  WarningToast,
} from "../../Components/Toast";
import ToastContext from "../../context/toast-context";

export default function AdminTransaction() {
  const authCtx = useContext(AuthContext);
  const toastsCtx = useContext(ToastContext);

  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onAcceptHandler = (id, index) => {
    // console.log(id);
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/transaction`,
        { id: id, status: "accepted" },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        // console.log(response);
        let newTransactions = [...pendingTransactions];
        newTransactions.splice(index, 1);
        setPendingTransactions(newTransactions);

        toastsCtx.push(
          <SuccessToast
            message="Transaction approved."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .catch((error) => {
        // console.log(error);

        if (error.response.status === 501) {
          toastsCtx.push(
            <WarningToast
              message="Bad Request."
              key={toastsCtx.toasts.length}
            />
          );
          return;
        }

        if (error.response.status === 404) {
          toastsCtx.push(
            <WarningToast
              message="Invalid transaction."
              key={toastsCtx.toasts.length}
            />
          );
          return;
        }

        if (error.response.status === 400) {
          toastsCtx.push(
            <WarningToast
              message="insufficient customer balance."
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

  const onRejectHandler = (id, index) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/transaction`,
        { id: id, status: "rejected" },
        {
          headers: { Authorization: authCtx.token },
        }
      )
      .then((response) => {
        // console.log(response);
        let newTransactions = [...pendingTransactions];
        newTransactions.splice(index, 1);
        setPendingTransactions(newTransactions);

        toastsCtx.push(
          <DangerToast
            message="Transaction disapproved."
            key={toastsCtx.toasts.length}
          />
        );
      })
      .catch((error) => {
        // console.log(error);

        if (error.response.status === 501) {
          toastsCtx.push(
            <WarningToast
              message="Bad Request."
              key={toastsCtx.toasts.length}
            />
          );
          return;
        }

        if (error.response.status === 404) {
          toastsCtx.push(
            <WarningToast
              message="Invalid transaction."
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/transaction`, {
        headers: { Authorization: authCtx.token },
      })
      .then((response) => {
        // console.log(response.data);
        setPendingTransactions(response.data);
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
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SideBar />
      <div className="w-screen pl-16">
        {!isLoading && pendingTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen uppercase text-tertiary-400 font-semibold text-lg">
            <FaExchangeAlt size="200px" />
            <h1>No Pending Transactions</h1>
          </div>
        ) : (
          <>
            <h1 className="block uppercase tracking-wide text-primary text-base md:text-lg font-bold my-4 text-center">
              Pending Transactions
            </h1>
            {isLoading ? (
              <div className="flex items-center justify-center h-screen">
                <div>
                  <svg
                    className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-tertiary-500"
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
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="px-5">
              <div className="overflow-x-auto relative shadow-md rounded-lg mb-10">
                <table className="w-full text-xs md:text-sm lg:text-base text-left text-primary">
                  <thead className="text-xs md:text-sm text-secondary uppercase bg-tertiary-400 text-center font-extrabold">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Time
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Username
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Type
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Amount
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingTransactions.map((transaction, index) => {
                      return (
                        <ActionButtons
                          transaction={transaction}
                          index={index}
                          onAcceptHandler={() => {
                            onAcceptHandler(transaction.id, index);
                          }}
                          onRejectHandler={() => {
                            onRejectHandler(transaction.id, index);
                          }}
                          key={index}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const ActionButtons = ({
  transaction,
  index,
  onAcceptHandler,
  onRejectHandler,
}) => {
  const [disable, setDisable] = useState(false);
  return (
    <>
      <tr className="bg-white border-b text-center" key={transaction.id}>
        <td className="py-4 px-6">
          {new Date(transaction.timestamp).toLocaleString("id")}
        </td>
        <td className="py-4 px-6">{transaction.username}</td>
        {transaction.type === "deposit" ? (
          <td className="py-4 px-6 uppercase text-green-600 font-bold">
            {transaction.type}
          </td>
        ) : (
          <td className="py-4 px-6 uppercase text-red-600 font-bold">
            {transaction.type}
          </td>
        )}
        <td className="py-4 px-6">
          IDR{" "}
          {transaction.amount.toLocaleString("id", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
        <td className="py-4 px-6 flex justify-center gap-1">
          <button
            className="inline-flex items-center py-2 px-2 text-base font-medium text-center text-white bg-green-500 rounded-full hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300  disabled:cursor-not-allowed disabled:hover:bg-green-500"
            onClick={() => {
              setDisable(true);
              onAcceptHandler();
            }}
            disabled={disable}
          >
            <CgCheck />
          </button>
          <button
            className="inline-flex items-center py-2 px-2 text-base font-medium text-center text-white bg-red-500 rounded-full hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed disabled:hover:bg-red-500"
            onClick={() => {
              setDisable(true);
              onRejectHandler();
            }}
            disabled={disable}
          >
            <CgClose />
          </button>
        </td>
      </tr>
    </>
  );
};
